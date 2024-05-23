import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app=express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase is Connected");
}).catch((err)=>{
    console.log(err);
})
app.listen(8080,()=>{
    console.log("App is Listen to the Port 8080");
})