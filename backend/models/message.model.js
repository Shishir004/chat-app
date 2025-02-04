const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {  // ✅ Fixed capitalization
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {  // ✅ Fixed spelling from "reciverId" to "receiverId"
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true  // ✅ Make sure messages always have text
    },
    image: {
        type: String
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
