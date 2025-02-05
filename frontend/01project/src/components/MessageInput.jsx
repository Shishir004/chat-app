import React, { useRef, useState } from 'react'
import { Image, Send, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useChatStore } from '../store/useChatStore';
const MessageInput = () => {
  const [text,setText]=useState('');
  const [previewImage,setPreviewImage]=useState(null);
  const fileInput=useRef(null);
  const {sendMessage}=useChatStore();

  const handleImage=(e)=>{
    const file=e.target.files[0];
    if(!file.type.startsWith('image/'))
    {
        toast.error("Please select only images");
        return
    }
    const reader=new FileReader();
    reader.onloadend=()=>{
        setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

  };
  const removeImage=()=>{
    setPreviewImage(null);
    if(fileInput.current)
    {
        fileInput.current.value="";
    }
  };
  const handleMessages=async (e)=>{
    e.preventDefault();
    if(!text.trim()&&!previewImage)
    {
        return
    }
    try{
        await sendMessage({
            text:text.trim(),
            image:previewImage
        });
        setText('');
        setPreviewImage(null);
        if(fileInput.current)fileInput.current.value="";
    }
    catch(error)
    {
        console.log("Error"+error);
    }
  };
  return (
    <div className="p-4 w-full">
        {previewImage && (
            <div className="mb-3 flex items-center gap-2">
                <div className="relative">
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                    />
                    <button
                        onClick={removeImage}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                        type="button"
                    >
                        <X className="size-3" />
                    </button>
                </div>
            </div>
        )}
        <form onSubmit={handleMessages} className='flex items-center gap-2'>
          <div className="flex-1 flex gap-2">
            <input type='text' 
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            value={text}
             onChange={(e)=>{setText(e.target.value)}}/>
             <input type='file' accept='image' className='hidden' ref={fileInput} onChange={handleImage}/>
             <button type='button' className={`hidden sm:flex btn btn-circle ${previewImage?'text-emerald-500':
                'text-zinc-400'
             }`}
             onClick={()=>{fileInput.current?.click()}}>
                <Image size={20}/>
             </button>
          </div>
          <button type='submit' className="btn btn-sm btn-circle"
          disabled={!text.trim()&& !previewImage}>
            <Send size={22}/>
          </button>
        </form>
    </div>
);
}

export default MessageInput;