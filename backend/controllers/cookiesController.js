import cookiesModel from "../models/cookiesModel.js";
import fs from 'fs'

const addCookies = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const cookies = new cookiesModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    }) 
    try {
        await cookies.save();
        res.json({success:true,message:"Cookies added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
//all cookies
const listCookies = async(req,res)=>{
    try {
        const cookies = await cookiesModel.find({});
        res.json({success:true,data:cookies})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})    
    }
}
//remove  item

const removeCookie = async(req,res)=>{
    try {
        const cookie = await cookiesModel.findById(req.body.id);
        fs.unlink(`uploads/${cookie.image}`,()=>{})
        await cookiesModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Cookie removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


export {addCookies,listCookies,removeCookie}