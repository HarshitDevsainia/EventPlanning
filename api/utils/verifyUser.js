import { errorHandler } from "./error.js";
import Jwt from 'jsonwebtoken'


export const verifyUser=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        next(errorHandler(400,'Unautherised User'));
    }
    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(500,'Unautherised User'));
        }
        req.user=user;
        next();
    })
}