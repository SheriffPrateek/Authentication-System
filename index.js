const express=require('express');
const model=require('./Model/Schema');
const User=require('./Controller/Users');
const CheckUser=require('./Controller/Functions');
const axios=require('axios');
const LoginCheck=require('./Controller/Middleware');
const cookieParser=require('cookie-parser');
const app=express();
app.use(cookieParser());
app.set('view engine','ejs');


app.get("/",LoginCheck,async(req,resp)=>{

    const result=await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=aa2fc13d7c8746739712a9aac7bea2e9`); 
    resp.render('Home',{result});
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

app.get("/news",async(req,resp)=>{
    const q=req.query.newsfield;
    const res=await axios.get(`https://newsapi.org/v2/everything?q=${q}&apiKey=aa2fc13d7c8746739712a9aac7bea2e9`);
    
    resp.render('News',{res});
    
});

app.get("/login",(req,resp)=>{
   resp.render('Login');
});

app.get("/loggedin",async(req,resp)=>{
    const user=await CheckUser(req,resp);
    
    if(user!=null){
      const token=User.setuser(user);
      resp.cookie("token",token);
        resp.redirect("/");
    }
    else{
        resp.redirect("/auth");
    }
});

app.listen(3000);