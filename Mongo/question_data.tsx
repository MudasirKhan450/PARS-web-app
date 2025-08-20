import { model, models, Schema } from "mongoose";


const User_Schema = new Schema({
        post:{type:String,required:true} , 
        date:{type:String,required:true},
        image:{type:Buffer},
        Id:{type:String,required:true},
        the_comment:[
                {
        comment: String,
        user_name: String,
        profile_url: String
                }
        ] ,  
        upvote:{type:Number , min:0} ,
        myId1:[{type:String}] ,  
        myId2:[{type:String}] ,  
        downvote:{type:Number , min:0} , 

        

})
const Question_data =  models.Questions || model("Questions",User_Schema)     

export default Question_data