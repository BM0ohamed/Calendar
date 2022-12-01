import React from 'react'
import Event from './Event'

export default function Day({ name, events }) {
  return (
    <li className="cd-schedule__group">
        <div className="cd-schedule__top-info"><span>{name}</span></div>
        <ul>
            {events.map((event, eventKey) => {
                return <Event
                    key={`event-${eventKey}`}
                    startTime={event.startTime}
                    endTime={event.endTime} 
                    title={event.title}
                    coach={event.coach}
                    place={event.place}
                    eventNumber={(eventKey + 1)%4 +1}
                />
            })}
        </ul>
    </li>
  )
}
