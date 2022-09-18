const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const meterSchema=new mongoose.Schema({
    name:String,
    phone:Number,
    email:{
        type:String,
        
    },

    password:String,
    
    tokens:[{
        token:{
            type:String
        }
    }]
})

meterSchema.methods.generateAuthToken=async function(){
    try{
        const token =jwt.sign({_id:this._id},"mynameisamanjaiswalsonofaniljaiswalal")
        // console.log(token);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
        
    }
    catch(err)
    {
        console.log("error",err)
    }
}

const Metermodel=new mongoose.model("METERMODULE",meterSchema);

module.exports=Metermodel;