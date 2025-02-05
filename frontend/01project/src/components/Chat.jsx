import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const Chat = () => {
  const { messages, isMessagesLoading, getMessages, selectedUser } = useChatStore();
  const messageEndRef = useRef(null);
  const { authUser } = useAuthStore();

  // Ensure authUser is loaded before rendering
  if (!authUser) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  useEffect(() => {
    if (selectedUser?._id && authUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages, authUser]); // Added authUser as dependency

  useEffect(() => {
    if (messages && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <div>No messages yet. Start chatting!</div>}
        {messages.map((message, index) => {
          const profilePic =
            message.senderId === authUser._id
              ? authUser.profilePic || "/avatar.png"
              : selectedUser.profilePic || "/avatar.png";
          return (
            <div
              key={message._id}
              className={`chat ${authUser && message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={index === messages.length - 1 ? messageEndRef : null} // Assign ref to last message only
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={profilePic} alt="user image" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && <img src={message.image} alt="image" className="sm:max-[200px]:rounded-mb mb-2" />}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default Chat;
