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
export const getOneEvent=async(req,res,next)=>{
    const id=req.params.eventID;
    try{
        const data=await event.findById(id);
        console.log(data);
        if(!data){
            next(errorHandler(400,'No Event Exist'));
            return;
        }
        res.status(200).json(data);
    }
    catch(err){
        next(err);
    }
}
export const deleteEvent=async(req,res,next)=>{
    const eventId=req.params.eventId;
    const userId=req.params.userId;
    if(req.user.id!=userId){
        next(errorHandler(400,'Unautherised User'));
        return;
    }
    try{
        const data=await event.findById(eventId);
        if(userId!=data.eventOwner){
           next(errorHandler(500,'You are not Allowed to Delete this Event'));
          return;
        }
        await event.findByIdAndDelete(eventId);
        res.status(200).json({msg:'successFully deleted'});
    }
    catch(err){
        next(err);
    }
}