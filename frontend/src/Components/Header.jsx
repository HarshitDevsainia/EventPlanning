import { Button, Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOutUserSuccess } from '../redux/user/userSlice';


export default function Header() {
  const path=useLocation().pathname;
  const {currUser}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  console.log(currUser);
  async function handleSignOut() {
    try{
        const res=await fetch('/api/auth/signOut',{method:'POST'});
        const data=await res.json();
        if(!res.ok){
            console.log(data.message);
            return;
        }
        dispatch(signOutUserSuccess());
        navigate('/');
    }catch(err){
        console.log(err);
    }
  }
  return (
    <>
        <Navbar>
            <Navbar.Brand>
                <img className='mr-3 h-6 sm:h-9 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKC3BoSUy5kUs8iCVQOh5OvEKrP2xM1y-rg&s" alt="logo" />
                <span className=' self-center whitespace-nowrap text-xl font-semibold'>Top Events</span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link href='/' active={path==='/'}>Home</Navbar.Link>
                <Navbar.Link href='/about' active={path==='/about'}>About</Navbar.Link>
                <Navbar.Link href='/create' active={path==='/create'}>Create Event</Navbar.Link>
            </Navbar.Collapse>
            {(currUser==null)?
                <Link to={'/signIn'}><Button size={'sm'} outline className=' !bg-violet-900'>SignIn</Button></Link>
                :<Button size={'sm'} outline className=' !bg-violet-900' onClick={handleSignOut}>LogOut</Button>
            }
        </Navbar>
    </>
  )
}
