"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PageAnimation from './PageAnimation'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/Utils/libs'
import { SignedIn, useUser } from '@clerk/nextjs'
import { queList } from './questionP'
import { toast } from 'sonner'
import CommentHim from './commentHim'
import ThePopOver2 from './PopOver2'
import ShowLinkLoader from './show_loader_link'
// import { Console } from 'console'


/*
e The DAta  */
type UserIs = {
  profile: string,
  name: string,
  Id: string,
  email: string,
  date: string,
}
let valueOfIncrement = 0
const For_MainPage = ({ Filter }: { Filter: string }) => {
  const router = useRouter()
  const OneTwo = async ()=>{
    let s = await fetch("http://127.0.0.1:8000/get-data" , {method:'GET',})
    let f = await s.json()
    console.log("The Value WE Have In The Following Is " , f)
  }
  // const [Filter, setFilter] = useState("all")
  const [BroAgainReload, setBroAgainReload] = useState(false)
  const [BrowseMore, setBrowseMore] = useState(3)
  const [FetchedList, setFetchedList] = useState({})
  const [IhaveId, setIhaveId] = useState([])
  const [TheUser, setTheUser] = useState([])

  const [Browsy, setBrowsy] = useState(false)
  const { user } = useUser()
  const Paths = usePathname()
  const KnowingPath = (target: string) => {
    if (Paths.endsWith(target)) {
      return true
    }
    else {
      false
    }
  }
  useEffect(() => {
    if (Filter == "all") {
      document.title = "PARS"
    }
    else if (Filter == "question") {
      document.title = "Questions in PARS"
    }
    else {
      document.title = "Posts in PARS"
    }
    const GettingDATA = async () => {
      setBrowsy(true)
      let f = await fetch("/api/question_data/", {
        method: "POST", headers: {},
        body: JSON.stringify({ type: Filter, skips: BrowseMore })

      })
      let res = await f.json()
      if (res.NewArray) {
        // console.log("the Res Having I got is " , res)
        setFetchedList(res.NewArray)
        setTheUser(res.getUsers)
        // setReloadOrNot(false)
        setBrowsy(false)
        setBroAgainReload(false)
      }
      // else{
      //   setReloadOrNot(true)
      // }
      else {
        toast("", {
          description: (
            <button className='flex justify-between gap-4 items-center ' onClick={() => window.location.reload()}>
              <span className='text-white'>Try Again </span>
              <Image src={"/Svgs/reload.svg"} alt='' width={22} height={22} />
            </button>
          ), style: { "color": "white", backgroundColor: "#1515d6", "display": "flex" }, position: "top-center"
        })
      }
      // console.log("the The DAta " , res)
    }
    GettingDATA()
  }, [BrowseMore , BroAgainReload==true])

  return (
    <section className=' w-[75%] min-h-full flex gap-16 my-3  '>
      <div className=' flex flex-col h-[10vh]  w-[15%] justify-between gap-2  '>
        <Link href={"/OnlyQ"} className={cn('flex items-center gap-1', { "text-red-500": KnowingPath("/OnlyQ") })}>
          {/* <ShowLinkLoader href='/OnlyQ' key={1} classy="flex items-center gap-1"> */}
          <Image src={KnowingPath("/OnlyQ") ? "/Svgs/ask2.svg" : "/Svgs/ask.svg"} alt='' width={22} height={32} />
          <span className='text-xl font-semibold'>Question</span>
          {/* </ShowLinkLoader> */}
        </Link>
        <Link href={"/OnlyAns"} className={cn('flex items-center gap-1', { "text-red-500": KnowingPath("/OnlyAns") })}>
          <Image src={KnowingPath("/OnlyAns") ? "/Svgs/post2.svg" : "/Svgs/post.svg"} alt='' width={22} height={32} />
          <span className='text-xl font-semibold'>Posts</span>
        </Link>
      </div>



      <div className='  w-[80%] flex flex-col    '>
        <SignedIn>

          <section className='flex flex-col gap-2 mb-2  border-black border-b-4 px-2 py-2 bg-[#1f1e1e] '>

            <Link href={"/Create_question"} className=' flex gap-4 '>
              <Image src={user?.imageUrl} alt='' width={32} height={32} className='rounded-full' />
              <span className='px-2 py-1 bg-[#141313] w-full text-center rounded-xl '>What Do You Want to Ask</span>
            </Link>
            <div className='flex justify-between self-center gap-32'>
              <button className='flex gap-2  items-center' onClick={() => { router.push("/Create_question") }}>
                <Image src={"/Svgs/post.svg"} alt='' width={22} height={22} />
                <span>Post</span>
              </button>
              <button className='flex gap-2 items-center' onClick={() => { router.push("/Create_question") }}>
                <Image src={"/Svgs/ask.svg"} alt='' width={22} height={22} />
                <span>ask</span>
              </button>
              <button className='flex gap-2 items-center' onClick={() => { router.push("/Create_question") }}>
                <Image src={"/Svgs/Answer.svg"} alt='' width={22} height={22} />
                <span>Answer</span>
              </button>
            </div>
          </section>
        </SignedIn>
        {
          // .length > 1
          Object.values(FetchedList).length > 0 ? (


            Object.values(FetchedList).map((item) => {
              // if(item.image){
              console.log("the Item Is ", item.the_comment)
              const buffer = item.image && Buffer.from(item.image)
              let f: UserIs[] = TheUser.filter(value => value.Id === item.Id)

              const mimeType = "image/jpeg"; // or image/png etc., based on how you stored it
              const ImageUrl = `data:${mimeType};base64,${buffer}`;
              // console.log("TheImage url " , typeof item.image , "and the " , typeof ImageUrl)
              // console.log("the Value I go go is " ,  f[0].name!)
              let ImageRemoved = false
              // console.log("the Index And Value Is ",buffer , FetchedList.length , "the Value I get again")
              const matched = queList.some(li => item.post.startsWith(li))
              const NextMatched = user?.id == item?.Id
              // const userId = clerkClient.users.getU
              return <div key={`${item?.date}+${item.post}`} className={cn(`flex flex-col pb-3 px-3 gap-2 rounded-xl  border-b-8 bg-[#1f1e1e]  border-black`, { "hidden": IhaveId.includes(item._id) })}>
                <section className='flex gap-3 items-center '>
                  {/* <div className='flex flex-col px-1.5 py-1.5'> */}
                  <div className='flex  items-center gap-1.5'>

                    <Link href={`/${item.Id}`} className='flex gap-1 items-center'>
                      <Image src={f && f[0].profile} alt='' width={30} height={22} className='rounded-full' />
                      <span className={cn('font-semibold')}>{f && f[0].name}</span>
                    </Link>
                    <button className='cursor-pointer  text-blue-600 ml-1'> Follow</button>
                    <span className='text-xs text-gray-500'>{item.date}</span>
                    {/* </div> */}
                  </div>
                  <button className='ml-auto cursor-pointer' onClick={() => setIhaveId([...IhaveId, item._id])}>
                    <Image src={"/Svgs/cross.svg"} alt='' width={30} height={30} />
                  </button>
                </section>
                <section className={cn('flex flex-col gap-1 ', { "font-bold": matched })}>
                  <p>{matched ? item.post + "?" : item.post} </p>
                  {
                    item.image ? (

                      <Image src={ImageUrl} alt='Is there Image' width={702} height={132} className='aspect-auto object-cover object-center' />
                      // <ThePopOver2 theImage={ImageUrl} width1={702} height1={132} width2={1900} height2={200}/>
                    ) :
                      ""
                  }
                </section>

                <CommentHim TheId={item._id} AgainReload={setBroAgainReload} matched={matched} mycomment={item.the_comment} myup={item.upvote} mydown={item.downvote} myId2={item.myId2} myId1={item.myId1} />

              </div>


            })
          ) :
            <div className='w-[100%] bg-[#2e2c2c]' onClick={() => console.log("optimized values ", FetchedList)}>
              <PageAnimation />
              <PageAnimation />
              <PageAnimation />
              <PageAnimation />
              <PageAnimation />
            </div>
        }
        <button className={ `${Browsy ? "bg-transparent" : "bg-blue-600"} items-center flex justify-center gap-3 h-[10vh] w-1/2 self-center`} onClick={() => setBrowseMore(10)} disabled={Browsy}>
        {
          Browsy ? 
          <div className='loaderbrowse '></div>

         :
         <>
         <span className='font-bold text-xl cursor-pointer'>Browse More</span>
          <Image src={"/Svgs/browse_more.svg"} alt='' width={26} height={26} />
         </>
        }
        </button>
        {/* <Link href={"/Khan"}>The Link</Link> */}
        {/* <ShowLinkLoader/> */}
        <button onClick={OneTwo} className='bg-yellow-400 w-32'>Send First </button>
        <button>send Second </button>
      </div>
    </section>
  )
}

export default For_MainPage