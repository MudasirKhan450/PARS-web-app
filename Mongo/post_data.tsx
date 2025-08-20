import { model, models, Schema } from "mongoose";


const User_Schema = new Schema({
        post:{type:String,required:true} , 
        image:{type:Buffer},
        Id:{type:String , required:true},
        date:{type:String,required:true} , 
        the_comment:[
                {
        comment: String,
        user_name: String,
        profile_url: String , 
        Id:String,
                }
        ] ,  
        upvote:{type:Number , min:0 } ,
        downvote:{type:Number , min:0 } , 
        myId1:[{type:String ,required:false}] ,  
        myId2:[{type:String, required:false}] ,  


})

const Post_Data =   models.POSTS_POSTS || model("POSTS_POSTS",User_Schema)   

export default Post_Data