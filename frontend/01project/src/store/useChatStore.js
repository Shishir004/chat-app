import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        try {
            set({ isUserLoading: true });
            const response = await axiosInstance.get('/messages/user');
            set({ users: response.data, isUserLoading: false });
        } catch (error) {
            toast.error("Something went wrong while fetching users: " + (error.response?.data?.message || ""));
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        // Clear previous messages before loading new ones
        set({ messages: [], isMessagesLoading: true });
        
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            // Only update if still viewing the same user
            if (userId === get().selectedUser?._id) {
                set({ messages: response.data, isMessagesLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
    
        if (!selectedUser) {
            toast.error("No user selected!");
            return;
        }
    
        // ✅ Debugging: Log outgoing message data
        console.log("Sending Message Data:", messageData);
    
        try {
            const response = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData,
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("Message Sent Successfully:", response.data);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            console.error("Send Message Error:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },    
    setSelectedUser: (user) => {
        console.log("selected user"+user);
        set({ 
            selectedUser: user,
            messages: []  // Always clear messages when changing users
        });
    },
    suscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser)
        {
            return 
        }
        const socket=useAuthStore.getState().socket;
        if(newMessage.senderId !== selectedUser) return;
        socket.on("newMessage",(newMessage)=>{
            set({messages:[...get().messages,newMessage]})
        });
    },
    unSuscribeToMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off('newMessages');
    }
}));