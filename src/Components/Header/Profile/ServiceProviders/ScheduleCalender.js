import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSnackbar } from 'notistack'
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import axios from '../../../../config/axios'

const ScheduleCalender = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [bookedEvents, setBookedEvents] = useState([])
  const [show, setShow] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/service-booking', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        setBookedEvents(data)
      } catch (err) {
        enqueueSnackbar( err.response.data.error || err.message, {
          variant: 'error',
          autoHideDuration: 3000, 
        })
      }
    })()
  }, [])

  const today = new Date().toISOString().split('T')[0]


  const calendarEvents = bookedEvents.map((event) => ({
    title: `${event.scheduleTime}`,
    start: new Date(event.scheduleDate),
    end: new Date(event.scheduleDate),
  }))

  const handleDateClick = (info) => {
    const dateClicked = info.dateStr
    const bookingsOnDate = bookedEvents.filter(event => {
      const eventDate = new Date(event.scheduleDate).toISOString().split('T')[0]
      return eventDate === dateClicked
    })

    setBookings(bookingsOnDate)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }
    
  return (
    <div>
      <h3 className="text-center m-4">Calendar</h3>

      <div className="m-4 bg-light">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: '',
            center: 'title',
          }}
          initialDate={today}
          validRange={{
            start: today,
            end: new Date(today).setDate(new Date(today).getDate() + 30),
          }}
          weekends={true}
          events={calendarEvents}
          dateClick={handleDateClick}
        />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bookings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bookings.map((booking, index) => (
              <div key={index}>
                <h4>Service: {booking.serviceId.serviceName}</h4>
                <p>Scheduled Time: {booking.scheduleTime}</p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default ScheduleCalender
