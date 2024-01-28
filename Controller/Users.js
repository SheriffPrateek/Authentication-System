
// STATEFULL USING SESSIONS

/*class UserManagement{

    constructor()
    {

        this.map=new Map();        //hashmap in js to maintain state of user
    }
  setuser(uid,user){
     this.map.set(uid,user);
  }

  getuser(uid)
  {
    return this.map.get(uid);
  }
  clearuser(){
    this.map.clear();
  }
  haskey(uid){
    return this.map.has(uid);
  }
}

module.exports=User;

*/

//STATELESS USING JWT TOKEN

const jwt=require('jsonwebtoken');

class UserManagement{

 constructor(){
  this.secret="Prateek";
 }
setuser(user){
 const payload={
  id: user._id,
  name:user.User
 };
 return jwt.sign(payload,this.secret);
}

verifytoken(token)
{
  return jwt.verify(token,this.secret);
}


}
const User=new UserManagement();
module.exports=User;
