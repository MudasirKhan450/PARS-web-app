import { model, models, Schema } from "mongoose";


const User_Schema = new Schema({
        the_comment:[
                {
        comment: String,
        user_name: String,
        profile_url: String
                }
        ] ,  
        upvote:{type:Number} , 
        downvote:{type:Number,} , 


        

})
const Com_Ups =  models.Com_Upvoted_down || model("Com_Upvoted_down",User_Schema)     

export default Com_Ups