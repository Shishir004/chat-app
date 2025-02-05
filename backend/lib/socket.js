const {Server}=require('socket.io');
const http=require('http');
const express=require('express');

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173']
    }
})
io.on('connection',(socket)=>{
    console.log('A user is connected',socket.id);
    socket.on("disconnected",()=>{
        console.log("A user is disconnected",socket.id);
    })
})

module.exports={io,app,server};