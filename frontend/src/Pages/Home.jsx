import React from 'react'
import {Carousel , Card} from 'flowbite-react'
import { Typewriter } from 'react-simple-typewriter'


export default function Home() {
  return (
    <div className='min-h-screen'>
      <div className='text-4xl sm:text-3xl font-bold md:h-auto sm:px-24 md:px-24 lg:px-24 xl:px-24 py-16 h-96 m-20 '>
          W<Typewriter words={['elcome to the Top Events']} loop />
          <p className='text-sm font-normal'>Welcome to <b>Top Event </b>, your ultimate solution for seamless and stress-free event planning. Whether you’re organizing a corporate conference, a wedding, a birthday party, or any special occasion, our platform provides all the tools you need to create memorable events with ease.</p>
      </div>
      <div className="!h-[500px] sm:h-44 xl:h-80 2xl:h-96 py-3">
      <Carousel>
        <img src="https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/14607677/pexels-photo-14607677.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg" alt="..." />
      </Carousel>
    </div>
    
    <div className=" grid p-5">
        <Card
          className="max-w-sm"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://images.pexels.com/photos/7648306/pexels-photo-7648306.jpeg"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tech Conference 2024
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
          Annual technology conference with keynote speakers and workshops.
          </p>
        </Card>
    </div>
    </div>
  )
}
