"use client"
import { useUser } from '@clerk/nextjs'
import { Loader, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

//TODO : I have to also make the upvode and downovte as the comment Becuse due 
//TODO2  : to user name and Id will say not the upvote will be again for it just once for each post ( so the user Id should be stored )
const CommentHim = ({TheId , matched , myId1,mydown , myId2 , myup,mycomment , AgainReload}:{TheId:string , matched:boolean
    myId1:Array<T> ,mydown:number , myup:number,mycomment:Array<T> , myId2:Array<T> ,AgainReload:any
}) => {
    const{user} = useUser()
    const get = myId1.some((value)=>user?.id==value)
    const [shouldBe, setshouldBe] = useState(myId1 ?  myId1.some((value)=>value==`${user?.id}`) : false)
    const [downBe, setdownbe] = useState(myId2 ? myId2.some((value)=>value==`${user?.id}`) : false)
    console.log('the Should be I have is ' , get , user?.id , downBe , shouldBe , myId1 , "my Id 2 " , myId2)
    // const shouldBe = myId1 ?  myId1.some((value)=>value==user?.id) : false
    // const downBe = myId2 ? myId2.some((value)=>value==user?.id) : false
    const [thecomment, setthecomment] = useState("")
    const [upvoting, setupvoting] = useState(false)
    const [getComments, setgetComments] = useState({})
    const [downvote, setdownvote] = useState(false)
    const [OpenCo, setOpenCo] = useState(false)
    const [ShowCoTr, setShowCoTr] = useState(false)
    // const [OpenUp, setOpenUp] = useState<string[]>([])
    // console.log("the Should be I got is " , shouldBe)
    
// console.log(TheId.TheId)
const router = useRouter()
    const SendingData = async (type:string)=>{
        // const myId = TheId
        if(!user?.id){
        router.push("")
        }
        try {
            
            if(type=="com"){
                if(OpenCo){   
                    setShowCoTr(true)
                const fetched = await fetch("/api/comment_etc/",{
                    method:"POST" , 
                    body:JSON.stringify({comment:thecomment , Id:user?.id,the_id:TheId , match:matched,user_name:user?.fullName,profile_url:user?.imageUrl,type:"comment"}) , 
                })
                let s = await fetched.json()
                console.log("the Getter I got from is " , s)
                setgetComments(s.getter)
            }
        }
        else if (type=="up"){
            // if(upvoting){

                const fetched = await fetch("/api/comment_etc/",{
                    method:"POST" , 
                    body:JSON.stringify({upvote:1,the_id:TheId , Id:user?.id , revote:upvoting , match:matched,type:"upvote"}) , 
                })
                let s = await fetched.json()
                console.log("the Getter I got from is " , s.getter)
                setgetComments(s.getter)
            // }
        }
        else {
            // if(downvote){

                const fetched = await fetch("/api/comment_etc/",{
                    method:"POST" , 
                    body:JSON.stringify({downvote:1,the_id:TheId , Id:user?.id , match:matched,type:"downvote"}) , 
                })
                let s = await fetched.json()
                console.log("the Getter I got from is " , s.getter)
                setgetComments(s.getter)
            // }
        }
    } catch (error) {
        
    }finally{
        setShowCoTr(false)
        setthecomment("")
        // AgainReload(true)
    }
    }
useEffect(() => {
    if(OpenCo){
        // Fetch The comment Data for the Id and on closing nothing will be shown which I did.
    }

}, [OpenCo])

    // OpenCo.includes("helo")
  return (
    <section className='flex flex-col gap-2' >
    <div className='flex items-center justify-between'>

    <div className=' brightness-100 bg-[#2e2c2c] flex justify-between gap-10 px-1 py-1 rounded-xl'>
    <button title='click to upvote' onClick={()=>
    {
    
        // setupvoting(!upvoting)
        SendingData("up")
    }
    
    } className='flex' >
    {
        shouldBe ? (
            <Image src={"/Svgs/upvote2.svg"} alt='' width={25} height={22}/>        
        ) :   <Image src={"/Svgs/upvote.svg"}  alt='' width={25} height={22}/> 
    }
    <span>upvote &nbsp; {myup}</span>
    </button>  
    
    <button title='click to downvote' onClick={()=>{
        // setdownvote(!downvote)
        SendingData("down")
        
        }}>
    {
        downBe ? (
            <Image src={"/Svgs/downvote2.svg"}  alt='' width={25} height={22}/>        
        ) :
        <Image src={"/Svgs/downvote.svg"} alt='' width={25} height={22}/>
    // <Image src={"/Svgs/upvote.svg"}  alt='' width={25} height={22}/>
    }
    </button>  
    <button title='comments' onClick={()=>{
            setOpenCo(!OpenCo)}} >
    {
            OpenCo ? (
                <Image src={"/Svgs/comment2.svg"} alt='' width={25} height={22}/>        
            ) : 
            
            <Image src={"/Svgs/comment.svg"} alt='' width={25} height={22}/>
    }
    {/* <Image src={"/Svgs/comment.svg"} alt='' width={25} height={22}/> */}
   
    </button>

    </div>
    <button title='make a menu item'>
    <Image src={"/Svgs/menu_svg.svg"} alt='' width={25} height={22}/>
    </button>
    </div>
    {
        OpenCo && (
            <div className='flex flex-col gap-3'>
                <div className='flex  items-center gap-1'>
                <Image src={`${user?.imageUrl}`} alt='' width={32} height={32} className='rounded-full'/>
                <input type='text' value={thecomment} placeholder='Comment' onChange={(e)=>{setthecomment(e.target.value)}} className='border-1 focus:outline-none w-[70%] px-1 py-1 rounded-2xl  border-black'/>
                <button className='' onClick={()=>SendingData("com")} disabled={ShowCoTr}>
                    {
                        ShowCoTr ? (
                         <Loader2 className='text-[#4894fd] animate-spin'/>
                        ) : <Image src={"/Svgs/send.svg"} alt='' width={32} height={32} className=''/> 
                    }

                </button>
                </div>
                <section className='flex justify-between pb-2 border-b border-gray-500 '>
                <span className=' font-bold text-white '>Comments</span>
                <button>
                    <Image src={"/Svgs/verticle_dot.svg"} alt='' width={24} height={24}/>
                </button>
                </section>
                {
                mycomment ? 
                mycomment.map((value)=>(

                    <div className='flex flex-col'>
                <Link href={"/TheIdIhave"} className='flex gap-1 items-center' >
                    <Image src={value.profile_url} alt='' width={22} height={22} className='rounded-full'/>
                    <span className='font-semibold'>{value.user_name}</span>
                </Link>
                <div className=' flex justify-between'>
                <p className=' ml-5'>{value.comment}</p>
                <Image src={"/Svgs/verticle_dot.svg"} className='' alt='' width={18} height={18}/>
                {/* further give functionlity to these Image and hide the comment as well  */}
                </div>
                </div>
                    )) : thecomment.length ==0 ?  <div className='flex text-red-500 text-[15px] flex-col items-center'>
                        No comments Yet
                        </div> :  <button className='flex  flex-col gap-5 text-white items-center'>
                            <Loader className='text-white animate-spin text-xs'/>
                            <Loader className='text-white animate-spin text-xs'/>
                            <Loader className='text-white animate-spin text-xs'/>
                        </button>
                } 
            </div>
        )    
    }
    </section>
  )
}

export default CommentHim


/*
onClick={()=>{
            setOpenUp([`${TheId}`])}}
            
                      {
            OpenUp.includes(`${TheId}`) ? (
                <Image src={"/Svgs/upvote2.svg"} onClick={()=>{
                    setOpenUp([""])}}  alt='' width={25} height={22}/>                
            ) :
            (

                <Image src={"/Svgs/upvote.svg"} alt='' width={25} height={22}/>
            )
        }  



        // pages/_app.tsx
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader' // Adjust path as needed
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      {loading && <Loader />}
      <Component {...pageProps} />
    </>
  )
}

*/