import React from 'react'
import { useDisclosure } from '@chakra-ui/react';

import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,

  FormLabel,
  Input, 
  Button,
  Select,

} from '@chakra-ui/react'
import { Calendar } from '../Calendar/Calendar';
interface TherapistsProps {
  therapists: {}[]
}

export const Scheduler = ({therapists}: TherapistsProps) => {
  console.log({therapists})
    // be called when the form is submitted
  const [ name, setName ] = useState('')
  const [ lastName, setLastName] = useState('')
  const [ email, setEmail] = useState('')  
  const [ startTime, setStartTime] = useState('')
  const [ endTime, setEndTime ] = useState('')
  const [ duration, setDuration] = useState(0)
  const [ startTimeHolder, setStartTimeHolder] = useState(0)
  const [ massage, setMassage] = useState('')

  
  const onCalendarClick = (startTime: any) => {
    setStartTimeHolder(startTime.date.getTime())
    console.log({startTimeHolder})
    setStartTime(new Date(startTime.date.getTime()).toLocaleString())

  }
  const handleDuChange = (e: any) => {
    let durationMil = e.target.value * 60 * 1000
    let newEndTime = startTimeHolder + durationMil
    let convertDate = new Date(newEndTime)
    setDuration(e.target.value)
    setEndTime(convertDate.toLocaleString())
  }

  const handleNameChange = (e: any) => {
    setName(e.target.value)
  }

  const handleMassageChange = (e: any) => {
    setMassage(e.target.value)
  }

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleStartTimeChange = (e: any) => {
    setEndTime(e.target.value)
  }
  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

        return (
          <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <form  autoComplete="false" >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Appointment</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>


           
              {/* <Field as={Input} name="startTime.hour"/> */}
             <FormLabel>
              Duration
              <Select value={duration} onChange={(e: any) => handleDuChange(e)}>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
                <option value={150}>150 minutes</option>
                <option value={180}>180 minutes</option>
              </Select>
             </FormLabel>

             <FormLabel>
              Name
              <Input value={name} onChange={(e: any) => handleNameChange(e)}/>
             </FormLabel>

             <FormLabel>
              Lastname
              <Input value={lastName} onChange={(e: any) => handleLastNameChange(e)}/>
             </FormLabel>

             <FormLabel>
              Email
              <Input value={email} onChange={(e: any) => handleEmailChange(e)}/>
             </FormLabel>

             <FormLabel>
              Type of Massage
              <Select value={massage} onChange={(e: any) => handleMassageChange(e)}>
                <option value={'tt'}>Thai</option>
                <option value={'dt'}>Deep Tissue</option>
                <option value={'sm'}>Swedish</option>
                <option value={'ta'}>Thai Aroma</option>
                <option value={'pm'}>Prenatal</option>
                <option value={'fr'}>Foot Reflexology</option>
              </Select>
             </FormLabel>

             <FormLabel>
              Start Time
              <Input value={startTime} onChange={(e) => handleStartTimeChange(e)}/>
             </FormLabel>
     

             <FormLabel>
              End Time
              <Input value={endTime} onChange={(e) => handleEndTimeChange(e)}/>
             </FormLabel>

            </ModalBody>
              <ModalFooter>
                <Button type='submit' onClick={onClose} colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
            </form>
          </Modal>
          <Calendar onOpen={onOpen} onCalendarClick={onCalendarClick}/>
          </>
        )
}
