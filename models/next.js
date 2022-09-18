const mongoose=require("mongoose");
const meterScema=new mongoose.Schema({
  
    firstname:String,
    secondname:String,
    idname:String,
    id:Number
   

})

const Next=new mongoose.model("NEXT",meterScema);

module.exports=Next;