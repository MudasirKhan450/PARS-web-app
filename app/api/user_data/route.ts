import MongoConnection from "@/Mongo/Connection";
import User_Data from "@/Mongo/user_schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

        const data= await req.json()
        // console.log("the Data Has Gotten ✔️🎫" ,data.email , "the Name " , data.name , data.hello)
        
        try {
        let s = await MongoConnection()
        if(s ){
            // console.log("the Connected Or nOt" , s)
            let f = await User_Data.find({Id:data.Id})
            console.log("the Value of F is " , f)
            if(f.length > 0){
                // console.log("the User is Present : 👍")
            }
            else{
                await User_Data.insertOne({name:data.name,email:data.email, profile:data.profile,Id:data.Id,date:data.date})
                // console.log("The User Data Stored Good ✅👤")
                return NextResponse.json({success:true})

            }
        }
        else{
            // console.log("the No Connection of Mongo 😢",s)
        }
    } catch (error) {
        console.log("The Error While Storing User Data ❌👤" , error)
        return NextResponse.json({success:false})
    }
    return NextResponse.json({"d":"f"})
}