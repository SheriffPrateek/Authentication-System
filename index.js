const express=require('express');
const model=require('./Model/Schema');
const User=require('./Controller/Users');
const CheckUser=require('./Controller/Functions');
const LoginCheck=require('./Controller/Middleware');
const cookieParser=require('cookie-parser');
const app=express();
app.use(cookieParser());
app.set('view engine','ejs');


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

app.get("/loggedin",async(req,resp)=>{
    const user=await CheckUser(req,resp);
    
    if(user!=null){
      const token=User.setuser(user);
      resp.cookie("token",token);
        resp.redirect("/home");
    }
    else{
        resp.redirect("/auth");
    }
});

app.listen(3000);