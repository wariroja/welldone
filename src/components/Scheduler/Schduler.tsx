import React, { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react';

import { useState, useEffect } from 'react'
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
  setBooking: (value: any) => void
}

export const Scheduler = ({therapists, setBooking}: TherapistsProps) => {
  const nameInput = useRef<any>();
  const lastNameInput = useRef<any>();
  const emailInput = useRef<any>();
  const durationSelect = useRef<any>();
  const massageSelect = useRef<any>();
  const therapistSelect  = useRef<any>();
  const startTimeInput  = useRef<any>(); 
  const endTimeInput  = useRef<any>();
  // const timeStampInput = useRef(null);  
    // be called when the form is submitted
  const [ name, setName ] = useState('')
  const [ lastName, setLastName] = useState('')
  const [ email, setEmail] = useState('')  
  const [ startTime, setStartTime] = useState('')
  const [ endTime, setEndTime ] = useState('')
  const [ duration, setDuration] = useState(0)
  const [ startTimeHolder, setStartTimeHolder] = useState(0)
  const [ massage, setMassage] = useState('')
  const [therapist, setTherapist] = useState('')


  const onCalendarClick = (startTime: any) => {
    setStartTimeHolder(startTime.date.getTime())
    console.log({startTimeHolder})
    setStartTime(new Date(startTime.date.getTime()).toLocaleString())
    setTherapist(startTime.resource.id)

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
  
   const handleSubmit = (form: any) => {
    form.preventDefault()
    let bookingInfo = {
      name: nameInput?.current?.value,
      lastName: lastNameInput?.current?.value,
      email: emailInput?.current?.value,
      duration: durationSelect?.current?.value,
      massage: massageSelect?.current?.value,
      startTimeInput: startTimeInput?.current?.value, 
      endTimeInput: endTimeInput?.current?.value,
      therapistSelect: therapistSelect?.current?.value,
    }
    console.log(bookingInfo)
    setBooking(bookingInfo)
    onClose()
  };

        return (
          <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <form onSubmit={handleSubmit} autoComplete="false" >
            <ModalOverlay />
            <ModalContent >
              <ModalHeader>New Appointment</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>

             <FormLabel>
              Name
              <Input ref={nameInput} value={name}  onChange={(e: any) => handleNameChange(e)}/>
             </FormLabel>

             <FormLabel>
              Lastname
              <Input ref={lastNameInput}value={lastName} onChange={(e: any) => handleLastNameChange(e)}/>
             </FormLabel>

             <FormLabel>
              Email
              <Input ref={emailInput} value={email} onChange={(e: any) => handleEmailChange(e)}/>
             </FormLabel>
             
             <FormLabel>
              Duration
              <Select ref={durationSelect} value={duration} onChange={(e: any) => handleDuChange(e)}>
                <option value={0}></option>
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>2 hours</option>
                <option value={150}>2.5 hours</option>
                <option value={180}>3 hours</option>
              </Select>
             </FormLabel>

             <FormLabel>
              Type of Massage
              <Select ref={massageSelect} value={massage} onChange={(e: any) => handleMassageChange(e)}>
                <option value={''}></option>
                <option value={'tt'}>Thai</option>
                <option value={'dt'}>Deep Tissue</option>
                <option value={'sm'}>Swedish</option>
                <option value={'ta'}>Thai Aroma</option>
                <option value={'pm'}>Prenatal</option>
                <option value={'fr'}>Foot Reflexology</option>
              </Select>
             </FormLabel>

             <FormLabel>
              Therapist
              <Select ref={therapistSelect} value={therapist} onChange={(e: any) => handleMassageChange(e)}>
                <option value={'a'}>Nicky</option>
                <option value={'b'}>Diamond</option>
                <option value={'c'}>Marissa</option>
                <option value={'d'}>Sam</option>
    
              </Select>
             </FormLabel>


             <FormLabel>
              Start Time
              <Input ref={startTimeInput}value={startTime} onChange={(e) => handleStartTimeChange(e)}/>
             </FormLabel>
     
             <FormLabel>
              End Time
              <Input ref={endTimeInput} value={endTime} onChange={(e) => handleEndTimeChange(e)}/>
             </FormLabel>

            </ModalBody>
              <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={3}>
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
