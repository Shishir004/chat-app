const User=require('../models/user.models');
const Message=require('../models/message.model');
const { response } = require('express');
const getUserforSidebar=async(req,res)=>{
    try{
        const currentUser=req.user._id;
        const filterdUser=await User.find({_id:{$ne:currentUser}}).select("-password")
        res.status(200).json(filterdUser)
    }
    catch(error)
    {
        console.log("The error is in getUserforSidebar function"+error)
        res.status(400).json({message:"server error"});
    }
}
const getMessages = async (req, res) => {
    try {
        const { id } = req.params;  // The receiver's user ID
        const userId = req.user._id; // The logged-in user's ID (from authentication middleware)

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: id },
                { senderId: id, receiverId: userId }
            ]
        }).sort({ createdAt: 1 }); // Sorting by time

        res.status(200).json(messages);
    } catch (error) {
        console.log("The error in getMessages function:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const sendMessages=async(req,res)=>{
    try{
        const{text,image}=req.body;
        const{id}=req.params;
        const SenderId=req.user._id;
        let imgaeUrl;
        if(image)
        {
            const response= await cloudinary.uploader.upload(image);
            imgaeUrl=response.secure_url;
        }
        const newMessage=new Message({
            SenderId,
            recieverId,
            text,
            image:imgaeUrl
        })
        await newMessage.save();
        // todo real time functionality with the help of socket.io
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessages function:", error);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports={getUserforSidebar,getMessages,sendMessages};