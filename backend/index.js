import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/formRouter.js';
dotenv.config();
const  app= express()
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// app.get('/',(req,res)=>{
//     res.send("hi user ")
// })
app.use('/', router);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected")
})
.catch((err)=>{
    console.error('db connection error:',err);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server running");
})