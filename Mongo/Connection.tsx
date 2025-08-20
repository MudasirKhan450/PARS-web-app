// import mongoose from "mongodb"
import mongoose from "mongoose"


let f = false 

export  const MongoConnection = async ()=>{
 if(f && mongoose.connection.readyState > 1){
    return 
 }
 try {
    
     let s = await mongoose.connect(`${process.env.CONNECT_STRING}`,{dbName:"TheFirstProject"})
     f = true 
     console.log("the Mongo Connected ✅✅")
     return true
 } catch (error) {
    console.log("the Error is Created ❌❌" , error)
    f = false 
    return false 
 }


}
export default MongoConnection