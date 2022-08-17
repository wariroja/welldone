import React,  { useMemo, useState, useEffect, useRef } from 'react';
import { Navbar } from '../NavBar/NavBar';
import { ModalForm } from '../ModalForm/ModalForm'
import { useDisclosure } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import  resourceTimelinePlugin from '@fullcalendar/resource-timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

export const Main = () => {
    let [therapists, setTherapists] = useState([])
    let [booking, setBooking ] = useState<any>()
    let [bookings, setBookings] = useState<any>()
    const [ startTime, setStartTime] = useState('')
    const [ startTimeHolder, setStartTimeHolder] = useState<any>(null)
    const [therapist, setTherapist] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [events, setEvents] = useState<any>(null)
    const calendarRef = useRef<any>(null)

    useEffect(() => {
      console.log('di')
      fetch("/api")
      .then(
        response => response.json()
      )
      .then( data => {
       setEvents(data)  
      })
    }, [booking]) //
    console.log({events})

    const newEvents = 
      events?.map((event:any) => {
      return (
        {title: event.name,
        resourceId: event.therapist, 
        start: event.startTime, 
        end: event.endTime.toLocaleString(),
        email: event.email,
        duration: event.duration
        }
        )
      })
    console.log({newEvents})
    
  
      //form default feilds set
      const onCalendarClick = (startTime: any) => {
        console.log(startTime.date)
        setStartTimeHolder(new Date(startTime.date))
        console.log({startTimeHolder})
        setStartTime(new Date(startTime.date.getTime()).toLocaleString())
        setTherapist(startTime.resource.id)
      }


      const handleDateClick = (event: any) => { 
        onCalendarClick(event)
        onOpen()
      }

;
    

    return (
        <div>
            <Navbar />
            <div>
              <FullCalendar schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives" plugins={[ resourceTimelinePlugin, interactionPlugin ]} 
              ref={calendarRef }
              dateClick= {(e) => handleDateClick(e)}
              slotMinTime='9:00:00'
              slotMaxTime='22:00:00'
              slotDuration='00:15:00'
              initialView='resourceTimeGridDay'
              headerToolbar= {{
                left: 'prev,next',
                center: 'title',
                right: 'today',
              }}
              initialDate={new Date()}
              editable={true}
              droppable={true}
              eventBackgroundColor="#000000"
              eventResizableFromStart= {true}
              resourceAreaWidth="40%"
              resources={[
                  { id: 'a', title: 'Nicky'},
                  { id: 'b', title: 'Diamond'},
                  { id: 'c', title: 'Marissa' },
                  { id: 'd', title: 'Sam' }]}
              events={newEvents}
  
              />
                <ModalForm calendarRef={calendarRef} booking={booking} setStartTime={setStartTime} setStartTimeHolder={setStartTimeHolder}therapists={therapists} startTime={startTime} onOpen={onOpen} isOpen={isOpen} onClose={onClose}  therapist={therapist} setBooking={setBooking} bookings={bookings} startTimeHolder={startTimeHolder}/>
                
            </div>
        </div>
    )
}