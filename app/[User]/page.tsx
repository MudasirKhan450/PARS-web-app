"use client"
import { useParams } from 'next/navigation'

import React, { useEffect } from 'react'

const TheUser = ({params}:{params:string}) => {
    // console.log(params)
    const user  = useParams()
    useEffect(() => {

    }, [])
    
    // console.log(the)
  return (
    <div>TheUser</div>
  )
}

export default TheUser