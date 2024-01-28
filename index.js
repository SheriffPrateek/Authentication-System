const express=require('express');
const model=require('./Model/Schema');
const User=require('./Controller/Users');
const CheckUser=require('./Controller/Functions');
const { v4: uuidv4 } = require('uuid');
const LoginCheck=require('./Controller/Middleware');
const cookieParser=require('cookie-parser');
//const sign=require("../Views/Signup.ejs");
const app=express();
app.set('view engine','ejs');

app.use(cookieParser());
app.get("/",LoginCheck,(req,resp)=>{
    
   resp.render('Home');
});
app.get("/auth",(req,resp)=>{
    resp.render('Auth');
});
app.get("/signup",(req,resp)=>{
    resp.render('Signup');
});
app.get("/register",async(req,resp)=>{
    const obj=new model({
        
        "User":req.query.username,
         "Password":req.query.password
        }
);
    const res=await obj.save();
    resp.render('Login');

});
app.get("/login",(req,resp)=>{
   resp.render('Login');
});

const route=express.Router();

// func to check whether user's cred match with database data

//route.use(middleware);

app.get("/logger",async(req,resp)=>{
    const user=await CheckUser(req,resp);
    console.log(user);
    if(user!=null){
        
      //  const uid=uuidv4();
      //  User.setuser(uid,user);
      //  resp.cookie("userid",uid);
      const token=User.setuser(user);
      resp.cookie("token",token);
        resp.redirect("/home");
    }
    else{
        resp.redirect("/auth");
    }
});

app.listen(3000);