import MongoConnection from "@/Mongo/Connection";
import Post_Data from "@/Mongo/post_data";
import Question_data from "@/Mongo/question_data";
import User_Data from "@/Mongo/user_schema";
import { clerkClient } from "@clerk/nextjs/server";
import { STATUS_CODES } from "http";
import { NextRequest, NextResponse } from "next/server";
// clerkClient
function shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }
export  async function POST(req:NextRequest){
    const {skips,type} = await   req.json() 
    let having = {}
    try {
        let s = await MongoConnection()
        if(s){
            let PostLength =  (await Post_Data.find({})).length 
            let QuestionLength =  (await Question_data.find({})).length
            console.log("Running the Main Functionlity🏃👟 " , PostLength , "and Q " , QuestionLength )
            let getUsers = await User_Data.find({})
            if(type==="all"){
                
                let poster = PostLength > skips ? await Post_Data.aggregate([{$sample:{size:skips}}]) : await Post_Data.aggregate([{$sample:{size:PostLength}}])
                let questioner = QuestionLength > skips ? await Question_data.aggregate([{$sample:{size:skips}}]) : await Question_data.aggregate([{$sample:{size:skips}}])
                // let questioner = QuestionLength > skips ? await Question_data.aggregate([{$sample:{size:skips}}]) : await Question_data.aggregate([{$sample:{size:QuestionLength}}])
                // let questioner = await Question_data.find({}).skip(skips)
                // poster.filter()
                // let adder = {poster,questioner}        
                let WillBearray = poster.concat(questioner)
                let NewArray = shuffleArray(WillBearray)

                // Object.assign(having,NewArray)
                let s = poster[0]
                console.log("the Value I got In  All is " , s.comment ,"the Questioner ", questioner.length , "and New One " , NewArray.length)
                console.log("the Got OOO", NewArray.length)

                return NextResponse.json({NewArray,getUsers})
            }
            else if(type=="question"){
                let questioner = QuestionLength > skips ? await Question_data.aggregate([{$sample:{size:skips}}]) : await Question_data.aggregate([{$sample:{size:QuestionLength}}])
                // let questioner = await Question_data.find({}).skip(skips)
                console.log("the Value I got In Questioner", questioner.length)
                Object.assign(having,questioner)
                let NewArray = shuffleArray(questioner)
                return NextResponse.json({NewArray,getUsers})
            }
            else {
                let poster = PostLength > skips ? await Post_Data.aggregate([{$sample:{size:skips}}]) : await Post_Data.aggregate([{$sample:{size:PostLength}}])
                console.log("the Value I got In Poster " , poster.length)
                let NewArray = shuffleArray(poster)
                return NextResponse.json({NewArray,getUsers})            
            }
        }
    } catch (error) {
        console.log("the Value I got In Error is  ", error)
        return NextResponse.json({success:false})
    }
    // console.log('the Having Lenght is ' , having?.length)
    return NextResponse.json({success:true})

}