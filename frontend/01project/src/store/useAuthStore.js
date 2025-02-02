import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
export const useAuthStore = create((set) => ({
    authUser: null,
    isSignInUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data })
        }
        catch (error) {
            console.log("The error is " + error);
            set({ authUser: null })
        }
        finally {
            set({
                isCheckingAuth: false
            })
        }
    },
    signUp: async (data) => {
        set({ isSignInUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSignInUp: false });
        }
    },
    LogOut: async () => {
        try {
            const response = await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("logged out successfully");
        }
        catch (error) {
            toast.error("there is some error"+error.response.data.message);
        }
    },
    Login:async(data)=>{
        set({isLogginIn:true});
        try{
            const response=await axiosInstance.post('/auth/login',data);
            set({authUser:response.data});
            toast.success("logged in successfully");
        }
        catch (error) {
            toast.error("!!!ERROR    "+error.response.data.message);
        }
    },
    updateProfiePic:async(data)=>{
        set({isUpdatingProfile:true})
        try{
            const response=await axiosInstance.put('/auth/update-profile',data);
            set({authUser:response});
            toast.success("Profile updated successfully");
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }
    }
}))