import { useState, useEffect } from 'react';
import './App.css';
import { getOffersForCompForXDay, getCoachName, getNameActivity } from "./api/helper"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css';
import DatePicker from 'react-date-picker';
import Schedule from './component/schedule/Schedule.js';
import moment from 'moment';

function App() {


  //logique JS
  const [date, setDate] = useState(new Date())
  const [offers, setOffers] = useState([])
  const [dateDebut, setDateDebut] = useState("2022-11-21")
  const [dateFin, setDateFin] = useState("2022-11-27")
  
  const [activities, setActivities] = useState([])

  useEffect(() => {
    getOffersForCompForXDay({
      minDate: dateDebut,
      maxDate: dateFin
    }).then((data) => {
      // On ne garde que les offres encore "bookable ou non-canceled (i.e. available = true)"
      const resultsAvailables = data?.results.filter(result => result.available)

      setOffers(resultsAvailables.map(resultAvailable => {
        const dateStart = new Date(resultAvailable.date_start)

        

        //const result = Promise.resolve([getCoachName(resultAvailable.coach), getNameActivity(resultAvailable.meta_activity)])
        
        return {
          coach: "CoachName",
          title: "activityName.\t"+"The coach is : "+getCoachName(resultAvailable.coach),
          day : moment(dateStart).format("dddd"),
          startTime : moment(dateStart).format("HH:mm"),
          endTime: moment(dateStart).add(resultAvailable.duration_minute, "m").format("HH:mm"),
          place: "can't access",
          effectif : resultAvailable.effectif,
          level : resultAvailable.level
        }
      }))
       console.log(offers)

    })
  },[])

  const onChange = (date) => {
    setDate(date)
    setDateDebut(date[0].toISOString().slice(0,10))
    setDateFin(date[1].toISOString().slice(0,10)) 
    // console.log(date)
  }



  


  return (
    // <main id="principale">
    //   {/* <section>
    //     <h1>There are {offers.count} offers between {date[0]?.toDateString()} and {date[1]?.toDateString()}</h1>
    //        */}
          
    //       {/* <button>Click dessus</button>
    //       {/* <div id="displayOffers">{offers?.coach || 0}</div> }
    //       <div id="displayOffers">{donnes?.coach}</div> */}



    //   {/* <h1 className='text-center'>React Calendar with Range</h1>
    //     <div className='calendar-container'>
    //       <Calendar
    //         onChange={onChange}
    //         value={date}
    //         selectRange={true}
    //       />
    //     </div>
    //     {date.length > 0 ? (
    //       <p className='text-center'>
    //         <span className='bold'>Start:</span>{' '}
    //         {date[0].toDateString()}
    //         &nbsp;|&nbsp;
    //         <span className='bold'>End:</span> {date[1].toDateString()}
    //       </p>
    //     ) : (
    //       <p className='text-center'>
    //         <span className='bold'>Default selected date:</span>{' '}
    //         {date.toDateString()}
    //       </p>
    //     )}

    //     {offers.count > 0 ? (
    //     <p className='text-center'>
    //         affiche frr
    //     </p>
    //     ) : (
    //       <p className='text-center'>
    //         offer.count est nul
    //       </p>
    //     )}
    //   </section> */}

    //   <section>
    //   </section>
    // </main>
    //on rajoute un boutton pour passer à la semaine suivante
    <main>
      <Schedule 
        eventsUnOrdered={offers}
      />
    </main>

// return <Event
// key={`event-${eventKey}`}
// startTime={event.startTime}
// endTime={event.endTime} 
// title={event.title}
// eventNumber={eventKey + 1}
// />
  );
}

export default App;
