import { model, models, Schema } from "mongoose";


const User_Schema = new Schema({
        name:{type:String,required:true} , 
        email:{type:String,required:true},
        Id:{type:String,required:true},
        date: {type:String,required:true},
        profile:{type:String, required:true} , 

        
})

const User_Data =  models.User_storage  || model("User_storage",User_Schema) 

export default User_Data