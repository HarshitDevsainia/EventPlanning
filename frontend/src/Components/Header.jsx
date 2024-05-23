import { Navbar } from 'flowbite-react'
import React from 'react'

export default function Header() {
  return (
    <>
        <Navbar>
            <Navbar.Brand>
                <img className='mr-3 h-6 sm:h-9 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKC3BoSUy5kUs8iCVQOh5OvEKrP2xM1y-rg&s" alt="logo" />
                <span className=' self-center whitespace-nowrap text-xl font-semibold'>Top Events</span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link href='/' active>Home</Navbar.Link>
                <Navbar.Link href='/about' active>About</Navbar.Link>
                <Navbar.Link href='/create'>Create Event</Navbar.Link>
                <Navbar.Link href='signin'>Signin</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    </>
  )
}
