'use server';

import { db, auth } from "@/firebase/admin";
import { _success } from "zod/v4/core";
import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days

export async function signUp(params: SignUpParams){
    const { uid, email, name } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                _success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return{
            _success: true,
            message: 'Account created successfully! Please sign in.'
        }

    } catch (e: any) {
       console.error('Error creating a user', e);
       
       if(e.code === 'auth/email-already-exists') {
           return {
            _success: false,
            message: 'Email already exists. Please use a different email.'
           }
       }

       return{
        _success: false,
        message: 'Failed to create an account.'
       }
    }
}

export async function signIn(params: SignInParams){
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                _success: false,
                message: 'User not found. Please sign up first.'
            }
        }
        await setSessionCookie(idToken);
    } catch (e) {
        console.log(e);

        return{
            _success: false,
            message: 'Failed to sign in. Please try again.'
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }

        const data = userRecord.data();
        return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
    } catch (e: any) {
         //  If cookie expired, clear it via redirect from client side
    if (e.code === "auth/session-cookie-expired") {
      console.log("Session expired.");
    } else {
      console.error("Session verification error:", e);
    }

    return null;
}
}

export async function isAuthenicated(){
    const user = await getCurrentUser();

    return !!user;
}

