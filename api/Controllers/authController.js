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
        return next(err);
    }
}
export const signIn=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,'required all information'));
    }
    try{
        const currUser=await User.find({email:email});
        if(!currUser[0]){
            next(errorHandler(400,'User Not Found'));
            return;
        }
        const checkPass=await bcrypt.compareSync(password,currUser[0].password);
        if(!checkPass){
            next(errorHandler(400,'Incorrect Password'));
            return;
        }
        res.send({JSON,msg: "Successfully login"});
    }
    catch(err){
       return next(err);
    }
}