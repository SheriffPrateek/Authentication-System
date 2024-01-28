
const model=require('../Model/Schema');
// func to check whether user's cred match with database data

const CheckUser= async function(req,resp){        
    const username=req.query.username;
    const password=req.query.password;
    console.log(username);
    const user=await model.findOne({"User":username,"Password":password});
   
    return user;   
}

module.exports=CheckUser;