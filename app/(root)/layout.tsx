import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { isAuthenicated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenicated();

  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className='flex items-center gap-2'>
          <Image src="/logo.svg" alt='logo' width={38} height={32}/>
          <h2 className='text-primary-100'>MockMate</h2>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout