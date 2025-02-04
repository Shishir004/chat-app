const User = require("../models/user.models");
const Message = require("../models/message.model");
const cloudinary = require("../lib/cloudinary.js");

const getUserforSidebar = async (req, res) => {
    try {
        const currentUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: currentUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUserforSidebar:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: id },
                { senderId: id, receiverId: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const sendMessages = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getUserforSidebar, getMessages, sendMessages };
