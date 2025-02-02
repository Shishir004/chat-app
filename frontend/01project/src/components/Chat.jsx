import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const Chat = () => {
    const { messages, isMessagesLoading, getMessages, selectedUser } = useChatStore();

    useEffect(() => {
        if (selectedUser?._id) {
            console.log("Selected User changed:", selectedUser);
            console.log("Fetching messages for:", selectedUser._id);
            getMessages(selectedUser._id);
        }
    }, [selectedUser, getMessages]);  // ✅ Removed `messages` from dependencies

    useEffect(() => {
        console.log("Updated messages state:", messages);
    }, [messages]);  // ✅ Separate effect to track messages updates

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            
            <div className="flex-1 overflow-y-auto p-4">
                <h1>Loading...</h1>
            </div>

            <MessageInput />
        </div>
    );
};

export default Chat;
