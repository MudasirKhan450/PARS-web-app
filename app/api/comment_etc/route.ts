// import Post_Data from "@/Mongo/Com_upvote";
import MongoConnection from "@/Mongo/Connection";
import Post_Data from "@/Mongo/post_data";
import Question_data from "@/Mongo/question_data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const data = await req.json()
    let s  =  await MongoConnection()
    try {
        console.log("the data I ha ve is " , data)
        if(s){
        if(data.type=="comment"){
            if(data.match){
                let comment = await Question_data.updateOne({_id:data.the_id},{$push:{the_comment:{ profile_url:data.profile_url , user_name:data.user_name,comment:data.comment}}},{upsert:false})
            }
            else{

                let comment = await Post_Data.updateOne({_id:data.the_id},{$push:{the_comment:{ profile_url:data.profile_url , user_name:data.user_name,comment:data.comment}}},{upsert:false})
            }
                console.log("the comment is done " )
            }
            else if(data.type=="upvote"){
                if(data.match){
                    let up1 = await Question_data.findOne({myId1:data.Id})
                    console.log("the up1 is we have " , up1 ,"and with the data.id is " , data.Id)
                    if(up1){

                        let up = await Question_data.updateOne({_id:data.the_id},{$inc: { upvote: -1 } , $pull:{myId1:data.Id}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    else{
                        let up = await Question_data.updateOne({_id:data.the_id},{$push:{myId1:data.Id},$inc:{upvote:+1}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    } 
                    up1.reload();
                }
                else{
                    console.log("the Data I have is " , data.Id)

                    let up1 = await  Post_Data.findOne({myId1:data.Id})
                    console.log("the up1 is we have " , up1 ,"and with the data.id is " , data.Id)

                    if(up1){

                        let up = await Post_Data.updateOne({_id:data.the_id},{$inc: { upvote: -1 }, $pull:{myId1:data.Id}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    else{
                        let up = await Post_Data.updateOne({_id:data.the_id},{$push:{myId1:data.Id},$inc:{upvote:+1}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    up1.reload()
                }
            }
            else if(data.type=="downvote"){
                if(data.match){
                    let up1 = await  Question_data.findOne({myId2:data.Id})
                    if(up1){

                        let up = await Question_data.updateOne({_id:data.the_id},{$inc: { downvote: -1 }, $pull:{myId1:data.Id}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    else{
                        let up = await Question_data.updateOne({_id:data.the_id},{$push:{myId2:data.Id},$inc:{downvote:+1}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    } 
                    up1.reload()
                }
                else{
    
                    let up1 = await Post_Data.findOne({myId2:data.Id})
                    if(up1){

                        let up = await Post_Data.updateOne({_id:data.the_id},{$inc: { downvote: -1 }, $pull:{myId1:data.Id}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    else{
                        let up = await Post_Data.updateOne({_id:data.the_id},{$push:{myId2:data.Id},$inc:{downvote:+1}},{upsert:false})
                        // return NextResponse.json({done:true,Id:up1})
                    }
                    up1.reload()
                }
            }
            return NextResponse.json({wow:""})
        }   
        } catch (error) {
            console.log("Can't Connect The Mongo Db Try Again sorry. ❌" ,error)
        }
    return NextResponse.json({wow:""})
}