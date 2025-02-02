const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:''
    }
},
{
    timestamps:true
})
const user=mongoose.model('User',userSchema);
module.exports=user;