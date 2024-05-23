import {errorHandler} from '../utils/error.js';
import User from'../model/user.js';
import bcrypt from 'bcrypt';
export const signUp=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password || username==='' || password==='' || email===''){
            next(errorHandler(400,'required All Information'));
            return;
        }
        const hashPass=await bcrypt.hashSync(password,10);
        const newUser=await new User({username,email,password:hashPass});
        await newUser.save();
        res.send({JSON,msg:'SuccessFully SignUp'});
    }
    catch(err){
        next(err);
    }
}