import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
const Login = () => {
  const { Login, isLogginIn } = useAuthStore();
  const [ showPassword, setShowPassword ] = useState(false);
  const [data, setData ] = useState({
    email: "",
    password: ""
  });
  const onSubmithandler = (e) => {
    e.preventDefault();
    Login(data);
  };
  return (
    <>
      <div className="h-screen grid lg:grid-cols-2">
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors"
                >
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                <p className="text-base-content/60">Sign in to your account</p>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmithandler} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email:e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => setData({ ...data,password:e.target.value })}
                />
                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>setShowPassword(!showPassword)}>
                  {
                    showPassword?
                    <EyeOff className='h-5 w-5 text-base-content/40'/>
                    :
                    <Eye className='h-5 w-5 text-base-content/40'/> 
                  }
                </button>
              </div>
            </div>
            <button type='submit' className='btn btn-primary' >
              Sign In
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
                  Don't have an account?
                  <Link to='/signup'
                  className='Link link-primary'>
                    Create Account
                  </Link>
            </p>
          </div>
        </div>
        <AuthImagePattern title={`Hey!!!
        Welcome back`} subtitle="Login to share your thoughts with your loved ones"/>
      </div>
    </>
  )
}

export default Login;