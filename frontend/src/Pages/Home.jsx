import React, { useEffect, useState } from 'react'
import {Carousel , Card} from 'flowbite-react'
import { Typewriter } from 'react-simple-typewriter'
import ImageBanner from '../Components/ImageBanner'
import {Link} from 'react-router-dom'
import EventCard from '../Components/EventCard'


export default function Home() {
  const [events,setEvents]=useState();
  useEffect(()=>{
    const fetchEvents=async()=>{
      try{
          const res=await fetch('/api/event/getEvent');
          const data=await res.json();
          if(!res.ok){
            console.log(data.message);
            return;
          }
          else{
            setEvents(data);
          }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchEvents();
  },[]);
  console.log(events);
  return (
    <div className='min-h-screen'>
      <div className='text-4xl sm:text-3xl font-bold md:h-auto sm:px-24 md:px-24 lg:px-24 xl:px-24 py-16 h-96 m-20 '>
          W<Typewriter words={['elcome to the Top Events']} loop />
          <p className='text-sm font-normal'>Welcome to <b>Top Event </b>, your ultimate solution for seamless and stress-free event planning. Whether you’re organizing a corporate conference, a wedding, a birthday party, or any special occasion, our platform provides all the tools you need to create memorable events with ease.</p>
      </div>
      <ImageBanner/>
      {events && 
        <>
        <h2 className="text-2xl font-semibold text-center p-2 bg-violet-100">Current Events</h2>
        <div className=" grid p-5 grid-col-1 sm:grid-cols-2 md:grid-cols-3">
         {events && events.map((event)=>(
            <Link className="m-2" key={event._id} to={`/${event._id}`}>
                <EventCard event={event}/>
            </Link>
          ))}
        </div>
        </>
      }
    </div>
  )
}
