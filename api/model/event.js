import mongoose, { Schema } from "mongoose";

const eventSchema=new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true,
    },
    eventImage:{
        type:String,
        required:true
    },
    eventStart:{
        type:Date,
        required:true
    },
    eventEnd:{
        type:Date,
        required:true
    },
    eventLocation:{
        type:String,
        required:true
    },
    eventOwner:{
        type:Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});

const event=mongoose.model('event',eventSchema);

export default event;