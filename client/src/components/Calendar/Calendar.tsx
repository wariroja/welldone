import React, { useRef } from 'react'
import FullCalendar, { BASE_OPTION_DEFAULTS } from '@fullcalendar/react' // must go before plugins
import  resourceTimelinePlugin from '@fullcalendar/resource-timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react'
interface CalendarProps {

  onOpen: () => void;
  onCalendarClick: (e: any) => any;
  bookings: any
}

export const Calendar = ({onOpen,onCalendarClick, bookings}: CalendarProps) => {

  const [bk, setBk ] = useState<any>()
  const calendarRef = useRef(null)
  useEffect(()=> {
    setBk(bookings)
  },[bookings])

  console.log({bookings})

  const handleDateClick = (event: any) => { 
    console.log('hi')
    console.log(event)
    onCalendarClick(event)
    onOpen()
  }
  // const updatedBk = bookings?.filter((b:any) => Object.keys(b).length > 1)

  const events = bookings?.map((booking: any) => {
    return { 
      resourceId: booking.therapist,
      title: booking.massage,
      start: new Date(booking.startTime).toISOString().slice(0, -2),
      }
    }
  )
  console.log({events})

  console.log({events}, 'inprops')
  // console.log({updatedBk})
        return (
          <>
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
            events={events}
          />
          </>
        )
}
