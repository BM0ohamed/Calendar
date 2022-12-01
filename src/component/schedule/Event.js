import React from 'react'

export default function Event({ startTime, endTime, title, eventNumber }) {
  return (
    <li className="cd-schedule__event">
        <a data-start={startTime} data-end={endTime} data-content={`event-${title.toLowerCase().replace(/ /g, '-')}`} data-event={`event-${eventNumber}`}>
            <em className="cd-schedule__name">{title}</em>
        </a>
    </li>
  )
}
