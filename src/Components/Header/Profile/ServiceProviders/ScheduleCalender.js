import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSnackbar } from 'notistack'
import axios from '../../../../config/axios'

const ScheduleCalender = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [bookedEvents, setBookedEvents] = useState([])

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
    title: event.serviceId.serviceName,
    start: new Date(event.scheduleDate ),
    end: event.scheduleTime,
  }))
  
  console.log(calendarEvents, "22")

  return (
    <div>
      <h3 className="text-center m-4">Calendar</h3>

      <div className="m-4 bg-light">
        <FullCalendar
          plugins={[dayGridPlugin]}
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
          events={calendarEvents} // Pass the events data
        />
      </div>
    </div>
  )
}

export default ScheduleCalender
