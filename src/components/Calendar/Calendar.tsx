import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import  resourceTimelinePlugin from '@fullcalendar/resource-timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

interface TherapistsProps {

  onOpen: () => void;
  onCalendarClick: (e: any) => any;
}

export const Calendar = ({onOpen, onCalendarClick}: TherapistsProps) => {
  const handleDateClick = (event: any) => { 
    console.log('hi')
    console.log(event)
    onCalendarClick(event)
    onOpen()
  }
    // be called when the form is submitted


  let bookings = [{
      id:'1',
      resourceId: 'a',
      title: 'Meeting',
      start: '2022-07-28T11:00:00',
      color: '#257e4a'
    }]
        return (
          <>
          <FullCalendar schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives" plugins={[ resourceTimelinePlugin, interactionPlugin ]} 
            dateClick= {(e) => handleDateClick(e)}
            slotMinTime='9:00:00'
            slotMaxTime='22:00:00'
            slotDuration='00:15:00'
            initialView='resourceTimeGridDay'
          //   customButtons = {{
          //     myCustomButton: {
          //     text: 'New Appointment 😊',
          //     click: function() {
          //       onOpen();
          //     }
          //   }
          // }}
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
            events={bookings}
          />
          </>
        )
}
