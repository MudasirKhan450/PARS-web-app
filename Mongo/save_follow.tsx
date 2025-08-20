import { model, models, Schema } from "mongoose";


const User_Schema = new Schema({
        following:{type:Array}, 
        followers:{type:Array}, 
        saved:{type:Array}, 
        

})
const Question_data =  models.Following_save || model("Following_save",User_Schema)     

export default Question_data