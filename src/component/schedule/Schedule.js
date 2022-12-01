import { weekdaysShort } from 'moment'
import React from 'react'
import Day from './Day'
import Modal from './Modal'
import "./Schedule.css"
import moment from 'moment';

//lien du template html/css : https://codyhouse.co/gem/schedule-template

export default function Schedule( { eventsUnOrdered} ) { 
    //on trie les events par jour
    const weeks = [
        { name: `Monday`, date: "", events: []},
        { name: "Tuesday", date: "", events: []},
        { name: "Wednesday", date: "", events: [] },
        { name: "Thursday", date: "", events: [] },
        { name: "Friday", date: "", events: [] },
        { name: "Saturday", date: "", events: [] },
        { name: "Sunday", date: "", events: [] },
    ]



    const sortByTime = (a, b) => {
        return Number(a.startTime.replace(":", "")) - Number(b.startTime.replace(":", ""))
    }

    eventsUnOrdered.length > 0 && eventsUnOrdered.sort(sortByTime).map((event) => {
        const day = event.day
        const week = weeks.find(week => week.name === day)
        week.events = [...week.events, event]
        week.date = event.date
    })

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
                    {weeks.map((day, i) => {
                        return <Day
                                key={`day-${i}`}
                                name={`${day.name} ${day.date}`}
                                events={day.events}
                            />
                    })}
                </ul>
            </div>
        <Modal />

        </div>
    )
}