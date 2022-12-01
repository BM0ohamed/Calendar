import { weekdaysShort } from 'moment'
import React from 'react'
import Day from './Day'
import Modal from './Modal'
import "./Schedule.css"
import moment from 'moment';

//lien du template html/css : https://codyhouse.co/gem/schedule-template

export default function Schedule( { eventsUnOrdered } ) { 




    
    
    //on trie les events par jour
    const week = [
        { name: "Monday", events: []},
        // { name: "Tuesday", events: eventsUnOrdered.filter(event => event.dateStart.getDay() === "Tue") },
        { name: "Tuesday", events: []},
        { name: "Wednesday", events: [] },
        { name: "Thursday", events: [] },
        { name: "Friday", events: [] },
        { name: "Saturday", events: [] },
        { name: "Sunday", events: [] },
    ]


    eventsUnOrdered.map((event) => {
        const day = event.day
        week.find(week => week.name === day).events = [...week.find(week => week.name === "Monday").events, event]
    })

    // eventsUnOrdered.map((event) =>{
    //     const day = moment(event.startTime).format("dddd")
    //     week.map((week)=>{week.name===day?
    //         week.events : event
    //         console.log(week.events)
    //         console.log(event)
    //     })
    // })

    const segmentileHoursMax = 23
    const segmentileHoursMin = 0 

  return (
    <div className="cd-schedule margin-top-lg margin-bottom-lg js-cd-schedule">
        <div className="cd-schedule__timeline">
            <ul>
                {Array.from({ length: segmentileHoursMax - segmentileHoursMin }, (k) => k + segmentileHoursMin).map((hour, hourKey) => {
                    return (
                        <li key={`hour-${hourKey}`}><span>{`${hour}:00`}</span></li>
                    )
                })}
            </ul>
        </div>
        <div className="cd-schedule__events">
            <ul>
                {week.map((day, i) => {
                    return <Day
                            key={`day-${i}`}
                            name={day.name}
                            events={day.events}
                        />
                })}
            </ul>
        </div>
        <Modal />

    </div>
  )
}