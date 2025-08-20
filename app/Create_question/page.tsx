import QuestionComp from '@/components/questionP'
import Head from 'next/head'
import React from 'react'
// #181818
const CreateQuestions = () => {
  return (
      <section className=' bg-[#181818] h-[84vh] mt-10 w-[60%] mx-auto'>
          <QuestionComp/>
          <Head>
        <title>Create Your Question</title>
      </Head>
      </section>
  )
}

export default CreateQuestions