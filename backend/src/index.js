const express = require('express');
const authRoutes = require('../routes/auth.route');
const messageRoutes=require('../routes/message.route');
const cors=require('cors');
const dbconnection =require('../lib/db');
const cookieParser=require('cookie-parser');
require('dotenv').config();
dbconnection();
const port=process.env.PORT
const {app,server}=require('../lib/socket');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}
));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes); 

server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});




