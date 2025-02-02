import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import {Routes,Route, Navigate} from 'react-router-dom'
import Signup from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Settings from './pages/Settings.jsx'
import HomePage from './pages/HomePage.jsx'
import Profile from './pages/Profile.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from './store/useThemeStore.js'
import { THEMES } from './constants/index.js' 
function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme}=useThemeStore();
  useEffect(()=>{
    checkAuth();
  },
  [
    checkAuth
  ])
  if(isCheckingAuth && !authUser)
    return(
  <div className='flex items-center justify-center h-screen'>
    <Loader className='size-10 animate-spin'/>
  </div>
  )
  return (
    <div data-theme={THEMES}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/Profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
