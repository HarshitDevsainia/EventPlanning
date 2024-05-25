import { Button, FileInput, Datepicker, Label, TextInput, Textarea, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {app} from '../firebase.js'
import {getStorage , uploadBytesResumable , ref, getDownloadURL} from 'firebase/storage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function CreateEvent() {
  const [data,setData]=useState({});
  const [ImageFile,setImageFile]=useState();
  const [imageURL,setImageURL]=useState();
  const [imageFileUpload,setImageFileUpload]=useState(false);
  const [imageFileError,setImageFileError]=useState(null);
  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [error,setError]=useState(null);

  const {currUser}=useSelector((state)=>state.user);
  const navigate=useNavigate();

 
  const handleFileInput=(e)=>{
    const file=e.target.files[0];
    if(file){
        setImageFile(file);
        setImageURL(URL.createObjectURL(file));
    }
  }
  useEffect(()=>{
    if(ImageFile){
        UploadFile();
    }
  },[ImageFile]);
  const UploadFile=()=>{
    setImageFileError(null);
    setImageFileUpload(true);
    const Storege=getStorage(app);
    const fileName=new Date().getTime+ImageFile.name;
    const storageRef=ref(Storege,fileName);
    const uploadTask=uploadBytesResumable(storageRef,ImageFile);

    uploadTask.on(
        'state_changed',
        (snapshots)=>{
            const progess=(snapshots.bytesTransferred/snapshots.totalBytes)*100;
            setImageFileUploadProgress(progess.toFixed(0));
        },
        (error)=>{
            setImageFileError('Could Not Upload Image (file must be less than 2MB)')
            setImageFileUploadProgress(null);
            setImageFileUpload(false);
            setImageFile(null);
            setImageURL(null);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageURL(downloadURL);
                setData({...data,eventImage:downloadURL});
                setImageFileUpload(false);
                setImageFileUploadProgress(null);
                setImageFileError(null);
            });
        }
    );
  }
  const handleInputChange=(e)=>{
    setData({...data,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!data.eventImage || !data.eventName || !data.eventDescription || !data.eventStart || !data.eventEnd || !data.eventLocation){
        setError('All fiels are required To Fill');
    }
    else{
        setError(false);
        try{
            const res=await fetch(`/api/event/createEvent/${currUser._id}`,{
                method:'POST',
                headers:{'Content-Type':'application/JSON'},
                body:JSON.stringify(data)
            });
            const currData=await res.json();
            if(!res.ok){
                setError(currData.message);
                return;
            }
            navigate('/');
        }
        catch(err){
            setError(err.message);
            return;
        }
    }
  }
  return (
    <div className='min-h-screen max-w-2xl mx-auto p-2'>
        <h1 className='text-2xl text-center font-semibold m-5'>Create Your Event</h1>
        {imageFileError!=null && <Alert color='failure' onDismiss={()=>setImageFileError(null)}>{imageFileError}</Alert>}
        {error!=null && <Alert color='failure' onDismiss={()=>setError(null)}>{error}</Alert>}
        <div className="mb-5">
            <form onSubmit={handleSubmit}>
                <div className="my-2">
                    <Label htmlFor='eventName'>Name</Label>
                    <TextInput 
                        type='text' 
                        placeholder='EventName' 
                        id='eventName' 
                        required 
                        onChange={handleInputChange}
                    />
                </div>
                <div className="my-2">
                    <Label htmlFor='eventDescription'>Decription</Label>
                    <Textarea type='text' placeholder='EventDescription' id='eventDescription' required onChange={handleInputChange}/>
                </div>
                <div className="my-2">
                    {imageURL && <img className='w-24 h-16 rounded-lg' src={imageURL} alt='image'></img>}
                    {imageFileUpload && <p className=' font-semibold text-blue-600'>{imageFileUploadProgress}%</p>}
                    <Label htmlFor='eventImage' value='Upload Image'/>
                    <FileInput type='text' id='eventImage' required onChange={handleFileInput} disabled={imageFileUpload}/>
                </div>
                <div className="my-2">
                    <Label htmlFor='eventStart' value='Start'/>
                    <Datepicker 
                        type='text' 
                        id='eventStart' 
                        required 
                        onSelectedDateChanged={(date)=>setData({...data,['eventStart']:date.toLocaleDateString()})}
                    />
                </div>
                <div className="my-2">
                    <Label htmlFor='eventEnd' value='End'/>
                    <Datepicker 
                        type='text' 
                        id='eventEnd' 
                        required 
                        onSelectedDateChanged={(date)=>setData({...data,['eventEnd']:date.toLocaleDateString()})}
                    />
                </div>
                <div className="my-2">
                    <Label htmlFor='eventLocation' value='Location'/>
                    <TextInput type='text' placeholder='EventLocation' id='eventLocation' required onChange={handleInputChange}/>
                </div>
                <Button type='submit' className='mt-5 bg-violet-900 w-full' >Create</Button>
            </form>
        </div>
    </div>
  )
}
