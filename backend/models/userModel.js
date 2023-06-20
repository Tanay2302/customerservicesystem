const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true,'please add a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please add a passwpd'],
        
    },
    isAdmin:{
        type:Boolean,
        required:[true,'please add a passwpd'],
        default:false
    }


},{timestamps:true})
module.exports=mongoose.model('users',userSchema)