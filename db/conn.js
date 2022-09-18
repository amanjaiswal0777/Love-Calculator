
const mongoose=require('mongoose')
// const db=('mongodb://127.0.0.1:27017/meterdata')
const db="mongodb+srv://amanjaiswalphotos:amanjaiswalphotos@cluster0.vge3ipr.mongodb.net/meterline?retryWrites=true&w=majority"
const dbb=mongoose.connection;
//  const dbb="mongodb+srv://puneetsuperstar_312:9958507308am@cluster0.sxdg3.mongodb.net/form?retryWrites=true&w=majority";
mongoose.connect(db)
    .then(() => {
        console.log("CONNECTION OPEN!!!!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!!!")
        console.log(err);
    })


module.exports=db;

