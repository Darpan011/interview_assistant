import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/interviewCard'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice and feedback</h2>
          <p className='text-lg'>
            Practice real interview questions and get instant feedback.
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href = '/interview'>Start an interview</Link>
          </Button>
        </div>

        <Image src = "/robot.png" alt = "robo-dude" width={400} height={400} className='max-sm:hidden'/>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
          {/* <p>There are no interviews available</p> */}
      </section>


      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an interview</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  )
}

export default page