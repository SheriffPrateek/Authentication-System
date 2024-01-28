const mongoose=require('mongoose');
const connect=require('./DBconnection.js');
connect();
const Schema=mongoose.Schema({
    User: String,
    Password: String
});
const Model=mongoose.model('User',Schema,'User');
module.exports=Model;