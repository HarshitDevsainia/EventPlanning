import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase is Connected");
}).catch((err)=>{
    console.log(err);
})
app.listen(8080,()=>{
    console.log("App is Listen to the Port 8080");
});

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);


app.use((err,req,res,next)=>{
    console.log(err);
    const statusCode=err.statusCode||400;
    const errMsg=err.message||"Internal Server Error";
    res.status(statusCode).json({success:false,statusCode:statusCode,message:errMsg});    
})