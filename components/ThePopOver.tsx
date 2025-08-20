import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Image from 'next/image'

const ThePopOver = ({text, theImage , content}:{text:string , theImage:string , content:string}) => {
  return (
    <Popover>
  <PopoverTrigger><div className='flex gap-1 cursor-pointer justify-between items-center border py-1 pl-1 pr-1.5 rounded-3xl' >
                        
                        { theImage.length > 3 &&
                            
                        <Image src={`${theImage}`} alt='thw' width={20} height={20}/>
                        }
                        <span className=''>{text}</span>
                        <Image src={"/Svgs/upper.svg"} alt='thw' width={20} height={20}/>
                         </div></PopoverTrigger>
  <PopoverContent className='bg-[#262626] text-blue-500 w-[12vw]'>{content}</PopoverContent>
</Popover>
  )
}

export default ThePopOver