import React from 'react';
import { Carousel } from 'flowbite-react';

export default function ImageBanner() {
  return (
    <div className="!h-[500px] sm:h-44 xl:h-80 2xl:h-96 py-3">
      <Carousel>
        <img src="https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/14607677/pexels-photo-14607677.jpeg" alt="..." />
        <img src="https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg" alt="..." />
      </Carousel>
    </div>
  )
}
