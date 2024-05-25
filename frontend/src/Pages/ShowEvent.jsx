import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Modal } from 'flowbite-react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function ShowEvent() {
  const [event,setEvent]=useState();
  const {currUser}=useSelector((state)=>state.user);
  const path=useLocation().pathname;
  const id=path.slice(1,path.length);
  const [showModel,setShowModel]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
      const fetchEvent=async()=>{
        try{
          const res=await fetch(`/api/event/getOneEvent/${id}`);
          const data=await res.json();
          if(!res.ok){
            console.log(data.message);
            return;
          }
          console.log(data);
          setEvent(data);
        }catch(err){
          console.log(err);
        }
      }
      fetchEvent();
  },[])
  const handleDelete=async ()=>{
    try{
        const res=await fetch(`/api/event/${event._id}/${currUser._id}`,{
          method:'DELETE'
        });
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        navigate('/');
    }
    catch(err){
      console.log(err);
      return;
    }
  }
  return (
    <div className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto flex items-center justify-center p-2">
      {event && 
        <Card
         className="max-w-3xl"
         imgAlt="img"
         imgSrc={event.eventImage}
       >
         <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           {event.eventName}
         </h5>
         <p className="font-normal text-gray-700 dark:text-gray-400">
           {event.eventDescription}
         </p>
         <p className=''><b>Location:</b> {event.eventLocation}</p>
          <div className="flex justify-between items-center">
            <p className='text-sm font-semibold'>Start: {new Date(event.eventStart).toLocaleDateString()}</p>
            <p className='text-sm font-semibold'>End: {new Date(event.eventStart).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <Link to={`/updateEvent/${currUser._id}/${event._id}`}><Button className=' bg-violet-900'>Update</Button></Link>
            <Button className=' bg-violet-900' onClick={()=>setShowModel(true)}>Delete</Button>
          </div>
       </Card>
      }
      <Modal 
         show={showModel}
         onClose={()=>setShowModel(false)}
         popup
         size={'md'}
       >
           <Modal.Header/>
           <Modal.Body>
             <div className="text-center">
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto'/>
                 <h3 className='mb-5 text-lg text-gray-400 dark:text-gray-400'>Are you sure you want to delete the Event?</h3>
             </div>
             <div className="flex justify-center gap-4">
               <Button color='failure' onClick={handleDelete}>Yes I'm sure</Button>
               <Button color='gray' onClick={()=>setShowModel(false)}>No,Cancel</Button>
             </div>
           </Modal.Body>
       </Modal>
    </div>
  )
}
