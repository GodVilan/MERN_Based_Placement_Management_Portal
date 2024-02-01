import mongoose from "mongoose"
var loginSchema = new mongoose.Schema({
    uid:String,
    name:String,
    password:String
  });
 const loginModel = mongoose.model("studentLogin",loginSchema);

export default loginModel