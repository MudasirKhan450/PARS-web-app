"use client"
import { cn } from '@/Utils/libs'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import TheAccordion from './TheAccordion'
import ThePopOver from './ThePopOver'
import ThePopOver2 from './PopOver2'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useProgressRouter } from './pusher'
// import { URL } from 'url'

export const queList = ["Who","What","Why","How","Where",'Which',"Whom","When" ,"Are" ,"Were", "Do" , "Does" , "Had" , "Have","Has","Is","Am","Was","Did"]
const QuestionComp = () => {
    // const router = useRouter()
    // const whichPage = router.query.from
    const [Post_Question, setPost_Question] = useState(true)
    const [Show_or_not, setShow_or_not] = useState(true)
    const [ImageGetter, setImageGetter] = useState<[string,boolean,File | null]>(["",true,null])
    const Image_Ref = useRef<HTMLInputElement>(null)
    const Area_Ref = useRef<HTMLTextAreaElement>(null)
    const [ForPost, setForPost] = useState("")
    const [ForQuestion, setForQuestion] = useState("")
    const {user} = useUser()
    const [SendingDAta, setSendingDAta] = useState(false    )
    const IsPresent = (e:any)=>{
        // queList.some(item=>{item!=e.target.value.})
        let f = "hello"
        // f.includes("hello" || "thanks" || "return")

    }
    useEffect(() => {
        document.title = "Create Your Questions and Posts "
    }, [])
    
    // const url = ne
    const router = useRouter()
    const{pushWithProgress} = useProgressRouter()
    const dataform = new FormData()
    const SubmittingData = async ()=>{
        setSendingDAta(true)
        console.log(ImageGetter)
        const date = new Date()
        const TheTime = `${date.getDate()} /  ${date.getMonth()+1} /  ${date.getFullYear()} ` 
    const matched = queList.some(lis=>ForQuestion.startsWith(lis))
        try {
            

        if(Post_Question){
        if((ImageGetter[1] && ImageGetter[0])){
            dataform.append("image",ImageGetter[2])
            dataform.append("post" ,`${ForPost}` )
            dataform.append("type","post")
            dataform.append("Id", `${user?.id}`)
            dataform.append("Date",TheTime)
            const fetcher = await fetch("/api/post_data/", {method:"POST" , body:dataform})
            const res  = await fetcher.json()
            console.log("the gone data or not ✔️", res.success)
            if(res.success){

                toast.success("SuccessFully Created Your Post", {position:'top-center',style:{color:"blue",background:"black"}})            
            }
            else{
                toast.error("Sorry! Post won't be created try again ",{position:'top-center',style:{color:"red",background:"black"}})
            }
        }
        else{
            dataform.append("post" ,`${ForPost}` )
            dataform.append("Id", `${user?.id}`)
            dataform.append("type","post")
            dataform.append("Date",TheTime)
            const fetcher = await fetch("/api/post_data/", {method:"POST" , body:dataform})
            const res  = await fetcher.json()
            console.log("the gone data or not ✔️", res.success)
            if(res.success){

                toast.success("SuccessFully Created Your Post", {position:'top-center',style:{color:"blue",background:"black"}})
            }
            else{
                toast.error("Sorry! Post won't be created try again ",{position:'top-center',style:{color:"red",background:"black"}})
            }
        }

        console.log("the True ",ForPost)
    }
    else{
        if(matched){

            if((ImageGetter[1]==false && ImageGetter[0])){
                
                dataform.append("image",ImageGetter[2])
                dataform.append("post" ,`${ForQuestion}` )
                dataform.append("type","question")
                dataform.append("Id", `${user?.id}`)
                dataform.append("Date",TheTime)
                const fetcher = await fetch("/api/post_data/", {method:"POST" , body:dataform})
                const res  = await fetcher.json()
                console.log("the gone data or not ✔️", res.success)
                if(res.success){

                    toast.success("SuccessFully Added Your Question", {position:'top-center',style:{color:"blue",background:"black"}})            
                }
                else{
                    toast.error("Sorry! Question were not added  try again ",{position:'top-center',style:{color:"red",background:"black"}})
                }
            }
            else{
                dataform.append("post" ,`${ForQuestion}` )
                dataform.append("type","question")
                dataform.append("Id", `${user?.id}`)
                dataform.append("Date",TheTime)
                const fetcher = await fetch("/api/post_data/", {method:"POST" , body:dataform})
                const res  = await fetcher.json()
                console.log("the gone data or not ✔️", res.success)
                if(res.success){

                    toast.success("SuccessFully Added Your Question", {position:'top-center',style:{color:"blue",background:"black"}})
                }
                else{
                    toast.error("Sorry! Question were not added  try again",{position:'top-center',style:{color:"red",background:"black"}})
                }
            }
        }
        else {
            toast.info("Question must starts with WH-words" ,{position:'bottom-center',style:{color:"yellow",background:"black"}} )
            setSendingDAta(false)
        }
        
    }
} catch (error) {
    setSendingDAta(false)
    console.log("Can't Added Your Question")
    toast.error("Can't be Created try Again",{position:'top-center',style:{color:"red",background:"black"}})
            
} finally{
    setSendingDAta(false)
    setImageGetter(["",true,null]   )
    setForPost("")
    setForQuestion("")
}

    }
const Resubmitting = ()=>{
    setTimeout(()=>{
        SubmittingData()
    },300)
}

  return (
        <div className='flex flex-col'>
            <div className='flex justify-between border-gray-800 pt-2 pb-1 border-b items-center'>

            <button onClick={()=>{setPost_Question(true)}}  className={cn('w-1/2  cursor-pointer font-bold text-xl',{"border-b-2 border-blue-700":Post_Question})}>Create Post </button>
            <button onClick={()=>{setPost_Question(false)}} className={cn('font-bold w-1/2 cursor-pointer text-xl',{"border-b-2 border-blue-700":!Post_Question})}>Ask Question </button>
            </div>
            {/* <div  className='bg-red-500 text-xl text-white '>Hello Worl</div> */}
            {
                Post_Question ? (
                    // Post Creation 
                    <main className='flex flex-col gap-1.5 pt-2'>
                        <div className='border-b border-gray-700  h-[68vh]'>

                        <textarea onChange={(e)=>setForPost(e.target.value)} value={ForPost} onClick={(e)=>{
                            const pos = e.currentTarget.selectionStart
                            console.log("the Pos is " , pos)
                        }} autoFocus name="" placeholder='Write something' className='h-[100%]  text-[18px]  focus:outline-none px-3 focus-visible:border-none w-full  resize-none' id=""></textarea>
                        </div>
                        <div className='flex items-center mx-2 justify-between'>
                        <div className='flex gap-10'>

                        <div className='cursor-pointer' title='Upload Image'>
                            <Image onClick={()=>Image_Ref.current?.click()} alt='' src={"/Svgs/camera.svg"} width={30} height={30}/>
                            <input ref={Image_Ref} type="file" accept='image/*' className='hidden' name="" onChange={(e)=>{
                                
                                const resul = e.target.files?.[0]
                                if(resul){
                                    // setImageGette
                                    // r(resul)
                                    const url = URL.createObjectURL(resul!)
                                    setImageGetter([url,true, resul])
                                }
                            }} id="" />

                        </div>
                        {ImageGetter[1] == true  && 
                    <div className='' title='Click To Enlarge'>
                        {/* the {`${!Post_Question}`} */}
                        {
                            ImageGetter[0] &&
                            // <Image src={`${ImageGetter[0]}`} alt="" width={30} height={30}/> 
                            <ThePopOver2 theImage={`${ImageGetter[0]}`} />
                        }
                        
                    </div>
                    }
                    </div>
                        <button className='bg-blue-700 flex justify-center  text-white rounded-3xl px-1 w-[7vw] text-xl font-bold pt-1.5 pb-2 cursor-pointer ' disabled={SendingDAta} onClick={()=>Resubmitting()}>
                        {
                            !SendingDAta ? 
                            <span>Post</span> : <LoaderCircle className='animate-spin text-center text-white'></LoaderCircle>
                        }
                        </button>
                        </div>
                    </main>
                ) : (
                    <div className='flex flex-col mx-2 mt-5 gap-5 '>
                        <div className='flex gap-4 items-center ' >
                    <Image src={`${user?.imageUrl}`} className=' border-2 self-center  rounded-4xl ' alt='' width={36} height={36}/>
                    {/* &gt; */}
                    {/* <Image src={"/Svgs/forward.svg"} className='invert-100  ' alt='' width={22} height={22}/> */}
                    <div>
                      {/* <TheAccordion/> */}
                      <ThePopOver text='Public'
                      theImage='/Svgs/People.svg' content='Your question will be public and will be shown in your profile of Question section and its answers as well'
                      />
                    </div>
                        </div>
                    {/* <input placeholder='Starts Question with Why , What and How' className='border-b px-1  placeholder:text-gray-500 border-gray-800 pt-1  py-1 focus:outline-none'/> */}
                    <div className='border-b'>

                    <textarea onChange={(e)=>{
                        // const turn = e.target.value.startsWith("how" || "what" || "why" || "where" || "when")
                        // console.log("the Turn Is these",turn)
                        setForQuestion(e.target.value)
                        
                    }
                    } value={ForQuestion} name="" id="" autoFocus className='text-[18px] h-[7vh]  w-full pt-3.5   focus:outline-none px-3    resize-none ' placeholder='starts Question with What , Why , How'></textarea>
                    </div>
                    <div className='px-1 h-[40vh]  border-b border-gray-700 bg-red-500 'onClick={()=>pushWithProgress("/")}>
                        <ul className='text-gray-400 text-[13px] flex flex-col gap-4 '>
                            <li className='border-b  pb-1' >What is Atom </li>
                            {/* <li>Why Should we promote them </li> */}
                        </ul>
                    </div>
                    <div className=' flex justify-between gap-4  '>
                    <div className='flex gap-14'>
 
                    <div className='cursor-pointer' title='Upload Image'>
                            <Image onClick={()=>Image_Ref.current?.click()} alt='' src={"/Svgs/camera.svg"} width={30} height={30}/>
                            <input ref={Image_Ref} type="file" accept='image/*' className='hidden' name="" onChange={(e)=>{
                                
                                const resul = e.target.files![0] as File
                                if(resul instanceof File){
                                    console.log(resul , " <-")
                                    const url = URL.createObjectURL(resul!)
                                    console.log("the Url is " , url)
                                    setImageGetter([url,false , resul])
                                }
                            }} id="" /> </div>
                    {  ImageGetter[1] == false  && 
                    <div className='' title='Click to Enlarge'>
                        {/* the {`${!Post_Question}`} */}
                        {
                            ImageGetter[0] &&
                            // <Image src={`${ImageGetter[0]}`} alt="" width={40} height={40}/> 
                            <ThePopOver2 theImage={`${ImageGetter[0]}`} />
                        }
                        
                    </div>
                    }
                    </div>
                    <button className='bg-blue-700   text-white rounded-3xl px-1 w-[12vw] text-[15px] font-bold pt-1.5 pb-2 cursor-pointer'disabled={SendingDAta} onClick={()=>{Resubmitting()}}>
                        {
                            !SendingDAta ? 
                            <span>Add Question</span> : <LoaderCircle className='animate-spin justify-self-center text-center text-white'></LoaderCircle>
                        }
                        
                        </button>
                            </div>
                    </div>
                )
            }

        </div>
    
  )
}

export default QuestionComp