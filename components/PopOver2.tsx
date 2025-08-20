import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Image from 'next/image'

const ThePopOver2 = ({theImage }:{ theImage:string}) => {
  return (
    <Popover>
  <PopoverTrigger>
    <Image src={`${theImage}`} width={40} height={40} className='aspect-video' alt=''/>
  </PopoverTrigger>
  <PopoverContent className='bg-transparent border-none '>
  <Image src={`${theImage}`} width={200} height={200} className='aspect-video' alt=''/>
  </PopoverContent>
</Popover>
  )
}

export default ThePopOver2