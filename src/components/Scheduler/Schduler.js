import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import  resourceTimelinePlugin from '@fullcalendar/resource-timegrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

export class Scheduler extends React.Component {
    render() {
        return (
          <FullCalendar schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives" plugins={[ resourceTimelinePlugin, interactionPlugin ]} 
            initialView='resourceTimeGridDay'
            headerToolbar={{left:"prev,next today", center:"title"}}
            initialDate={new Date()}
            editable={true}
            droppable={true}
            resources={[
                { id: 'a', title: 'Room A'},
                { id: 'b', title: 'Room B'},
                { id: 'c', title: 'Room C' },
                { id: 'd', title: 'Room D' }]}
            events={[
      {
        id:'1',
        resourceId: 'a',
        title: 'Meeting',
        start: '2022-07-28T11:00:00',
        color: '#257e4a',
        

      },

      
            ]}
          />
        )
      }
}