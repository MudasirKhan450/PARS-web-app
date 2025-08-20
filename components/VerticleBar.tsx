import Link from 'next/link'
import React from 'react'

const VerticleBar = () => {
  return (
        <section className='flex flex-col'>
            <Link href={"/OnlyQ"}>
            <span>Questions</span>
            </Link>
            <Link href={"/OnlyAns"}>
            <span>Answers</span>
            </Link>
        </section>
  )
}

export default VerticleBar