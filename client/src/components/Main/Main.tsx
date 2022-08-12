import React,  { useMemo, useState, useEffect } from 'react';
import { Navbar } from '../NavBar/NavBar';
import { ModalForm } from '../ModalForm/ModalForm'
import { useDisclosure } from '@chakra-ui/react';
import { Calendar } from '../Calendar/Calendar';


export const Main = () => {
    let [therapists, setTherapists] = useState([])
    let [booking, setBooking ] = useState<any>()
    let [bookings, setBookings] = useState<any>()
    const [ startTime, setStartTime] = useState('')
    const [ startTimeHolder, setStartTimeHolder] = useState(0)
    const [therapist, setTherapist] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [backendData, setBackendData] = useState<any>([{}])


    //   useEffect(() => {
    //     async function fetchData() {
    //       const response = await fetch('http://localhost:8080/api');
    //       const data = await response.json()
    //       return data
    //     }
    //     fetchData().then((data) => setBookings(data))
    //   }, []); // Or [] if effect doesn't need props or state
    // useEffect(() => {
    //     fetch('http://localhost:8080/api' , {
    //       method: "POST",
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify(booking)
    //     })
    //   },[booking])
    
    useEffect(() => {
      fetch("/api").then(
        response => response.json()
      ).then( data => {
        console.log({data})
        setBookings(data)
        console.log({bookings})
      })
    }, [booking]) // 

console.log('outerBook', bookings)
      const onCalendarClick = (startTime: any) => {
        setStartTimeHolder(startTime.date.getTime())
        console.log({startTimeHolder})
        setStartTime(new Date(startTime.date.getTime()).toLocaleString())
        setTherapist(startTime.resource.id)
      }

    return (
        <div>
            <Navbar />
            <div>
                <ModalForm  setStartTime={setStartTime} therapists={therapists} startTime={startTime} onOpen={onOpen} isOpen={isOpen} onClose={onClose}  therapist={therapist} setBooking={setBooking} bookings={bookings} startTimeHolder={startTimeHolder}/>
                <Calendar onOpen={onOpen} onCalendarClick={onCalendarClick} bookings={bookings}/>
            </div>
        </div>
    )
}