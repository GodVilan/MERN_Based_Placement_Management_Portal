import mongoose from "mongoose";
const Stdlogin=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

export default Stdlogin;