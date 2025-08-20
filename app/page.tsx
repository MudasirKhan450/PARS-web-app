import For_MainPage from '@/components/For_MainPage'
import VerticleBar from '@/components/VerticleBar'
import Head from 'next/head'
import React from 'react'

const page = () => {
  return (
    <section className=''>
      {/* <VerticleBar/> */}
      {/* <Head>
        <title>Create Your Question</title>
      </Head> */}
        <For_MainPage Filter='all'/>
    </section>
  )
}

export default page