 const express = require("express");
require("./db/conn");
const db=require("./db/conn");
const User=require("./models/home")
const Next=require("./models/next")
const url="mongodb://127.0.0.1:27017/meterdata";
const session=require("express-session");
const path=require("path");
const MongoStore=require("connect-mongo");
const port=process.env.PORT||8000;
const app=express();
const passport = require("passport");
const passportLocal=require("./db/passport-local");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const css_path=path.join(__dirname,"./public")
const view_path=path.join(__dirname,"./template/views");




app.use(express.json());
app.use(express.urlencoded());
app.set("view engine","ejs")
app.set("views",view_path);
app.use(express.static(css_path));
app.use(cookieParser());

app.use(session({
    name:"another",
    secret:"thisismycokiefromcn",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*100,
    },
    store:MongoStore.create(
        {
            mongoUrl:"mongodb+srv://amanjaiswalphotos:amanjaiswalphotos@cluster0.vge3ipr.mongodb.net/meterline?retryWrites=true&w=majority",
            autoRemove:"disabled"
        },
        function(err){
            console.log("hmara fail"||err);
        }
    )
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateduser)
app.get("/",(req,res)=>{
    if(req.isAuthenticated())
    {
        res.render("main");
    }else{
    return res.render("signin");}
})
app.get("/signup",(req,res)=>{
    if(req.isAuthenticated())
    {
        res.render("main");
    }else{
    return res.render("signup");}
})
app.get("/main",(req,res)=>{

    return res.render("main");
})
app.get("/forget",(req,res)=>{
    return res.send("My Condolences");
})
app.get("/error",(req,res)=>{
    return res.render("error");
})
app.get("/contact",passport.checkAuthentication,(req,res)=>{
    return res.render("contact");
})




app.post("/signupdone",async(req,res)=>{
    try{ 
        const emailEntered=req.body.email;
        const phoneEntered=req.body.phone;
        const username= await User.findOne({email:emailEntered});
        const phoneuser=await User.findOne({phone:phoneEntered});
        // console.log(phoneuser);
       
            
        if((!username && !phoneuser))
        {
            const signupdetail=new User({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
               password:req.body.password
            })
            const token=await signupdetail.generateAuthToken();
            // adding token to cookie
            res.cookie("jwt",req.body.phone,{
                httpOnly:true
               });
            const signupsaved=await signupdetail.save();
            return res.render("main");
        }
    
        else if(username){
            return res.send("user exited bro")
        }
        else if(phoneuser){
            return res.send("phone no.invalid")
        }
        
        
        
    }
    catch(er){
        
        return res.send("phone number invalid");


           
    }
})
// app.get("/signin_done",passport.checkAuthentication,(req,res)=>{
//     return res.render("main");
// })
app.post("/signin_done",passport.authenticate(
    'local',
    {
        failureRedirect:"/error"
    },
),
    async(req,res)=>{
    try{
        const emailEntered=req.body.email;
        const passEntered=req.body.password;
        const last=await User.findOne({email:emailEntered});
        const token=await last.generateAuthToken();
        if(!last)
        {
            return res.send("user not existed");
        }
        res.cookie("jwt",last.phone);
        if(passEntered!=last.password)
        {
            return res.send("password typed wrong");
        }
        else{
            return res.render("main");
        }
    }
    catch{
        console.log("ok");
return res.send("user not exited");
    }
})
app.post("/meterdone",async(req,res)=>{
    try{
        // return res.send(req.cookies.jwt)
        console.log("doen");
        const end=await User.findOne({phone:req.cookies.jwt});
        const meterdetail=new Next({
            firstname:req.body.firstname,
            secondname:req.body.secondname,
            idname:end.name,
            id:end.phone
        })
        const metersaved=await meterdetail.save();
        // console.log("done");
        

    }
    catch{
        return res.send("error");

    }
});
app.get("/logout",(req,res)=>{
    req.logout(function(err){
        if(err)console.log("error",err);

        return res.render("signin");
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("error");
    }

    console.log("server")
})