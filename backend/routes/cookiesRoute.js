import express from 'express'
import { addCookies, listCookies, removeCookie } from '../controllers/cookiesController.js'
import multer from 'multer'

const cookiesRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload= multer({storage:storage})

cookiesRouter.post("/add",upload.single("image"),addCookies);
cookiesRouter.get("/list",listCookies);
cookiesRouter.post("/remove",removeCookie);

export default cookiesRouter;