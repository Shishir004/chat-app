import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

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

    setSelectedUser: (user) => {
        // Reset messages when changing users
        if (user?._id !== get().selectedUser?._id) {
            set({ 
                selectedUser: user,
                messages: []  // Clear previous messages
            });
        }
    }
}));