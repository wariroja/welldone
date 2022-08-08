import React,  { useMemo, useState, useEffect } from 'react';
import { Navbar } from '../NavBar/NavBar';
import { Scheduler } from '../Scheduler/Schduler'


export const Main = () => {
    let [therapists, setTherapists] = useState([])
    let [booking, setBooking ] = useState<any>()
    useEffect(() => {
        fetch('http://localhost:8080/api' , {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then((result) => result.json())
        .then((info) => { console.log(info); })
      },[booking])

    //   useEffect(() => {
    //     fetch('http://localhost:8080/api')
    //     .then((result) => result.json())
    //     .then((info) => { console.log(info); })
    //   },[])
      
    return (
        <div>
            <Navbar />
            <div>
                <Scheduler therapists={therapists} setBooking={setBooking} />
            </div>
        </div>
    )
}