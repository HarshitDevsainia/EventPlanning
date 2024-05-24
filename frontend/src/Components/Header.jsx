import { Button, Navbar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const path=useLocation().pathname;
  const {currUser}=useSelector((state)=>state.user);
  console.log(currUser);
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
                :<Button size={'sm'} outline className=' !bg-violet-900'>LogOut</Button>
            }
        </Navbar>
    </>
  )
}
