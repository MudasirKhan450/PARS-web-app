import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"

import React from 'react'
const TheAccordion = () => {
  const{user} =  useUser()
  return (
    <Accordion type="single" collapsible>
  <AccordionItem value="item-1" className="">
  
    <AccordionTrigger>  </AccordionTrigger>
    <AccordionContent className="text-blue-500 h-[20vh] w-[6vw]">
    The Question You ask will be public
    </AccordionContent>
  </AccordionItem>
</Accordion>
  )
}

export default TheAccordion