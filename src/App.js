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
    <main>
      <Schedule 
        eventsUnOrdered={offers}
      />
    </main>
  );
}

export default App;
