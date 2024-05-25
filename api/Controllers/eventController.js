import event from '../model/event.js';
import {errorHandler} from '../utils/error.js'
export const showEvent=(req,res)=>{
    res.send({message:'Show'});
}
export const createEvent=async(req,res,next)=>{
    if(req.user.id!=req.params.id){
        return next(errorHandler(400,'Unautherised User'));
    }
    if(!req.body.eventName || !req.body.eventDescription || !req.body.eventImage || !req.body.eventStart || !req.body.eventEnd || !req.body.eventLocation){
        return next(errorHandler(400,'All fields are Required'));
    }
    try{
        req.body.eventOwner=req.params.id;
        const newEvent=await new event(req.body);
        await newEvent.save();
        res.status(200).json(newEvent);
    }
    catch(err){
        next(err);
    }
}
export const getEvent=async(req,res,next)=>{
    try{
        const data=await event.find();
        res.status(200).json(data);
    }
    catch(err){
        next(err);
    }
}