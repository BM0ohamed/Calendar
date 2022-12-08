import { useState, useEffect } from 'react';
import './App.css';
import { getOffersForCompForXDay, getCoachName, getActivityName, getEstablishment } from "./api/helper"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css';
import DatePicker from 'react-date-picker';
import Schedule from './component/schedule/Schedule.js';
import moment from 'moment';

function App() {


  //logique JS
  const [offerNumber, setOfferNumber] = useState(0)
  const [offers, setOffers] = useState([])
  const [dateDebut, setDateDebut] = useState("2022-11-21")
  const [dateFin, setDateFin] = useState("2022-11-27")

  useEffect(() => {
    getOffersForCompForXDay({
      minDate: dateDebut,
      maxDate: dateFin
    }).then((data) => {
      // On ne garde que les offres encore "bookable ou non-canceled (i.e. available = true)"
      setOfferNumber(data.count)
      const resultsAvailables = data?.results.filter(result => result.available)

      resultsAvailables.map(async (resultAvailable) => {
        // console.log(resultAvailable.establishment)
        const dateStart = new Date(resultAvailable.date_start)
        const coachName = await getCoachName(resultAvailable.coach)
        const activityName = await getActivityName(resultAvailable.meta_activity)
        // console.log(resultAvailable.establishment)
        // const etablissement = await getEstablishment(resultAvailable.establishment)
        // console.log(etablissement)

        const offerFormatted = {
          title: `activity : ${activityName}. The coach is ${coachName}`,
          day : moment(dateStart).format("dddd"),
          date: moment(dateStart).toISOString().slice(0,10),
          startTime : moment(dateStart).format("HH:mm"),
          endTime: moment(dateStart).add(resultAvailable.duration_minute, "m").format("HH:mm"),
          place: "can't access",
          effectif : resultAvailable.effectif,
          level : resultAvailable.level
        }

        setOffers((prevOffers) => ([
          ...prevOffers,
          offerFormatted
        ]))
      })
    })
  },[dateDebut])



  const nextWeek = () => {
    setDateDebut(moment(dateDebut).add(7,"d").toISOString().slice(0,10))
    setDateFin(moment(dateFin).add(7,"d").toISOString().slice(0,10))
    setOffers([])
  }

  const lastWeek = () => {
    setDateDebut(moment(dateDebut).subtract(7,"d").toISOString().slice(0,10))
    setDateFin(moment(dateFin).subtract(7,"d").toISOString().slice(0,10))
    setOffers([])
  }

  return (
    <main>
      <div> There is {offerNumber} offers between {moment(dateDebut).format("LL")} and {moment(dateFin).format("LL")}</div>
      <button type="button" onClick={lastWeek} >Last week</button>
      <button type="button" onClick={nextWeek} >Next week</button>
      <Schedule 
        eventsUnOrdered={offers}
      />
    </main>
  );
}

export default App;
