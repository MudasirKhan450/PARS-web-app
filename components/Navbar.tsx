"use client"
import { cn } from '@/Utils/libs'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname , useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

let theList = ["/" , "/Following", "/Answered_question" , "/Spaces", "/notify" , "/Create_question"]
const Navbar = () => {
    const PathName = usePathname()
    const [bgChanger, setbgChanger] = useState(false)
    const targetPath = (item:string)=>{
        // theList.some(item => PathName === item || PathName.includes(item))
        // const theName = PathName === item || PathName.includes(item)
        const theName = PathName.endsWith(item)
        return theName 
    }  
    const {user} = useUser()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    function handleClick(e: React.MouseEvent , href:string) {
      e.preventDefault();
      setLoading(true);
      router.push(href); // navigate
      let s = setTimeout(() => {
        
          setLoading(false)
      }, (10000));
      
    }
    useEffect(() => {
        const Sending = async()=>{
            // console.log("the User Emails is " , user?.primaryEmailAddress?.emailAddress)
            const thedate = new Date()
            // const data =  new Date()
            if(user?.fullName && user?.primaryEmailAddress?.emailAddress){

                let s = await fetch("/api/user_data/",{method:"POST",headers:{"Content-type":"Application/Json"},body:JSON.stringify({name:user?.fullName,email:user?.primaryEmailAddress?.emailAddress,Id:user?.id , date:`${thedate.getDate()} / ${thedate.getMonth()+1} / ${thedate.getFullYear()} ` , profile : user.imageUrl , hello:"khan"})})
                
                let success =await s.json()
                // console.log("the Succes I got is " , success)
                if(success.success){
                    // console.log("The Success Is " , success)
                    // Date.
                    toast.success(`You are Successfully Loged In   ${thedate.getDate()} / ${thedate.getMonth()+1}  / ${thedate.getFullYear()}`, {className:"bg-[#262626] text-white" , position:'top-right' , style:{color:"white",background:"#262626"}} )
                } 
            }
        }
        Sending()

    }, [user?.id , user])
    


  return (
    <nav className='bg-[#262626] px-20 md:-mx-20   flex text-white h-[9vh]  gap-10 items-center justify-between'>
            <Link className={cn("flex ")} href={"/"} >
                <Image  src={"/Svgs/quora_title.svg"} width={100} height={102} alt='logo'/>
                {/* <span></span> */}
            </Link>

            <SignedOut>

            <div className='bg-[#af1c26] px-1.5 rounded-2xl py-1 justify-self-end cursor-pointer'>

            <SignInButton>Create Account</SignInButton>
            </div>
            </SignedOut>
            <SignedIn>
            <Link className={cn("flex",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/")})} href={"/"}  title='Following'>
                <Image  src={targetPath("/")? "/Svgs/home2.svg" : "/Svgs/home.svg"} width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <Link className={cn("flex",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/Following")})} href={"/Following"}  title='Following'>
                <Image  src={targetPath("/Following")? "/Svgs/following2.svg" : "/Svgs/following.svg"} width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <Link className={cn("flex",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/Answered_question")})} href={"/Answered_question"}  title='Answers'>
                <Image  src={targetPath("/Answered_question")? "/Svgs/Answer2.svg" : "/Svgs/Answer.svg"} width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <Link className={cn("flex",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/Spaces")})} href={"/Spaces/"}  title='Spaces'>
                <Image  src={targetPath("/Spaces")? "/Svgs/spaces2.svg" : "/Svgs/spaces.svg"} width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <Link className={cn("flex ",{"border-b-2 border-[#ec2835] text-red-500   h-[8vh] ":targetPath("/notify")})} href={"/notify/"} onClick={(e)=>handleClick(e,"/notify")}  title='Notifications'>
                <Image  src={targetPath("/notify")? "/Svgs/bell2.svg" : "/Svgs/bell.svg" } className={''} width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <input className='focus-visible:border-none h-[5vh] w-[30vw] px-0.5 py-0.5  bg-[#0000008d]' placeholder='🔎 Search'/>
            {/* <Link className={cn("",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/")})} href={"/"} className='flex invert-100'>
                <Image  src={"/Svgs/quora_title.svg"} width={32} height={32} alt='logo'/>
                //For Quora+
                </Link> */}
            <div className='h-[5vh]'>
            <UserButton appearance={{elements:{
                userButtonAvatarBox:{
                    width:"30px" , 
                    height:"30px"
                }
            }}}></UserButton>
            </div>
            <Link className={cn("flex ",{"border-b-2 border-[#ec2835] h-[8vh] ":targetPath("/wow")})} href={"/"}>
                <Image  src={"/Svgs/globe.svg"} className='invert-100' width={32} height={32} alt='logo'/>
                {/* <span></span> */}
            </Link>
            <Link href={"/Create_question"} title='Create Your Question' className={cn(" items-center rounded-full   flex px-1 py-1 bg-[#f41624] justify-between",{"border-b-2 border-[#ec2835]  ":targetPath("/")})} >
                {/* <button  className='font-semibold  '>add question </button> */}
                <Image src={"/Svgs/ask.svg"} alt='' width={32} height={32}/>
                {/* <Image  src={"/Svgs/upper.svg"}  width={20} height={32} alt='logo'/> */}
                
                {/* <span></span> */}
            </Link>
                </SignedIn>
                {
                    // loading ? (
                    //     <div className='loader1 relative '></div>
                    // ) : ""
                }

        {/* </div> */}
    </nav>
  )
}

export default Navbar