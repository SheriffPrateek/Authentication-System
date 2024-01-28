const map=require('./Users');


const logincheck=function(req,resp,next){
   // const uid=req.cookies.userid;
     const token=req.cookies.token;
     console.log(token);
     if(token!=null)
     {

     
    if(map.verifytoken(token))
    {
        next();        
    }  
   } 
    else{

        resp.redirect("/auth");
    }
        
    
   
}

module.exports=logincheck;