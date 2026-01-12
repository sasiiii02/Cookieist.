import mongoose from "mongoose";
const cookiesSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

const cookiesModel = mongoose.models.cookies || mongoose.model("cookies",cookiesSchema);

export default cookiesModel;