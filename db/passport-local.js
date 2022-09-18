const passport=require("passport");

const LocalStrategy=require("passport-local").Strategy;

const User=require("../models/home")

passport.use(new LocalStrategy({
    usernameField:"email"
},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err) {console.log("error in user finding",err); return done(err);}

         if(!user || user.password!=password){
            
            return done(null,false,{ message: 'Incorrect username or password.' });
         }
        
         return done(null,user);

    })
}));

// serializeUser means putting id into cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializeUser means fetching the it stored in cookie\
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
           return done(err);
        };
    return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/");
}
 passport.setAuthenticateduser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
 }
module.exports=passport;





