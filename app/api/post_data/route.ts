import MongoConnection from "@/Mongo/Connection";
import Post_Data from "@/Mongo/post_data";
import Question_data from "@/Mongo/question_data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

        const got = await req.formData()
        console.log("the Got is 🫂🫂🫂" , got , got.get("type") , got.get("Date"))
        let s = await MongoConnection()
        let theBuf;
        if(got.get("image")){
                // const TheFile = new Blob()
        const getH  = got.get("image") as File;
        const arrayBuffer = await getH.arrayBuffer()
         theBuf =  Buffer.from(arrayBuffer)


        }
        // console.log("the 🖼️",theBuf)
        console.log("the S I have Is " , s)
        
        try {
         if(s){
             if(got.get("type")==="question"){
                if(!got.get("image")){

                        await Question_data.insertOne({post:got.get("post"),date:got.get("Date"),Id:got.get("Id")})
                        console.log("the Question with out Image ⛔")
                        return NextResponse.json({success:true})
                }

                await Question_data.insertOne({post:got.get("post"),date:got.get("Date"),Id:got.get("Id"),image:theBuf})
                console.log("the Question")
                console.log("the Question with  Image ")
                return NextResponse.json({success:true})    
        }


            else {
                if(!got.get("image")){
                        await Post_Data.insertOne({post:got.get("post"),date:got.get("Date"),Id:got.get("Id")})
                        console.log("the post with Out Image ")
                        return NextResponse.json({success:true})
                }
                        
                await Post_Data.insertOne({post:got.get("post"),date:got.get("Date"),Id:got.get("Id"),image:theBuf})
                console.log("the Post with  Image ⛔")
                console.log("the Answer")
                return NextResponse.json({success:true})  
                console.log("the Posted Data")
            }

        
        }
        else {
                console.log("Can't Connect The Mongo Db📅")
        }
        } catch (error) {
                console.log("the Error is Created while We sending the Questions and posts 📪❔",error)

                return NextResponse.json({success:false})
        }
        return NextResponse.json({"":""})

}