import React from 'react'
import { Card } from 'flowbite-react'

export default function ({event}) {
  return (
    <div>
        <Card
            className="max-w-sm"
            imgAlt="img"
            imgSrc={event.eventImage}
            >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {event.eventName}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-1">
            {event.eventDescription}
            </p>
            <div className="flex justify-between items-center">
            <p className='text-sm font-semibold'>Start: {new Date(event.eventStart).toLocaleDateString()}</p>
            <p className='text-sm font-semibold'>End: {new Date(event.eventStart).toLocaleDateString()}</p>
            </div>
        </Card>
    </div>
  )
}
