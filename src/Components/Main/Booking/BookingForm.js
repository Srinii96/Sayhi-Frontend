import { useState, useEffect } from "react"
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useSelector } from "react-redux"
import { useLocation, Link, useNavigate } from "react-router-dom"
import _ from "lodash"
import { useSnackbar } from 'notistack'
import "./BookingForm.css"
import axios from "../../../config/axios"
import ShowReviews from "../Review/ShowReviews"

const BookingForm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    const { _id: sId, serviceProviderName, categoryId, serviceIds } = location.state

    const { profile, address } = useSelector((state)=>{
        return state.user
    })
    const { firstName, email, mobileNumber } = profile
    const {_id, doorNo, buildingName, locality, landmark, city, state, pinCode} = address.length > 0 && address[0]
    const userAddress = `${doorNo}, ${buildingName}, ${locality}, ${landmark}, ${city}, ${state}, ${pinCode}.`

    const { title, _id: cId } = categoryId
    const service = serviceIds

    const [serviceId, setServiceId] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [addDetails, setAddDetails] = useState("")
    const [mNumber, setMNumber] = useState("")
    const [bookedSlots, setBookedSlots] = useState([])
    const [reviews, setReviews] = useState([])
    const [ formErrors, setFormErrors ] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    const errors = {}
    

    useEffect(()=>{
        setMNumber(mobileNumber)
    }, [mobileNumber])
      
    useEffect(()=>{
        if(sId){
            (async ()=>{
                const bookings = await axios.get(`/api/service-booking/${sId}`, {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                })

                const reviews = axios.get(`/api/reviews/${sId}`, {
                    headers: {
                      "Authorization": localStorage.getItem('token')
                    }
                })

                try{
                    const result = await Promise.all([bookings, reviews])
                    const [book, review] = result
                    setBookedSlots(book.data)
                    setReviews(review.data)
                }catch(err){
                    enqueueSnackbar( err.response.data.error ||  err.message, {
                        variant: 'error',
                        autoHideDuration: 5000, 
                    })
                }
            })()
        }
    }, [sId])
    
    const isSlotBooked = (formattedDate, timeSlot) =>
        bookedSlots.some(slot => {
            const formattedSlotDate = new Date(slot.scheduleDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
            }).replace(/\//g, '-')
        
            const timeCondition = slot.scheduleTime === timeSlot
        
            if (formattedSlotDate === formattedDate && timeCondition) {
            return true
            }
        
            return false
        })

    const handleDateChange = date => {
        setSelectedDate(date)
        setSelectedTime(null)
    }
    
    const generateTimeSlots = (start, end, interval) =>
    Array.from({ length: (end - start) / interval }, (_, i) => {
      const hour = start + i * interval
      return `${formatHour(hour)} - ${formatHour(hour + interval)}`
    })

    const formatHour = hour => {
        const h = hour % 12 || 12
        return `${h}:00 ${hour < 12 ? 'AM' : 'PM'}`
    }

    const formatDate = date =>
    date ? `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}` : ''

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const endOfMonth = new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 1, 0)

    const runValidations = ()=>{
        if(_.isEmpty(serviceId)){
            errors.serviceId = 'Please select service type'
        }
        if(_.isEmpty(selectedTime)){
            errors.selectedTime = 'Please select Date & available time slot'
        }
        if(_.isEmpty(mNumber)){
            errors.mNumber = "please update mobile number"
        }
        if(_.isEmpty(address)){
            errors.address = "please update address"
        }
    }

    const handleBooking = async (e) => {
        e.preventDefault()
        runValidations()

        if (!_.isEmpty(errors)){
            setFormErrors(errors)
        }else{
            const originalDateObject = new Date(selectedDate)
            const iso8601String = originalDateObject.toISOString()

            const formData = { 
                "customerName": firstName, 
                email, 
                mobileNumber, 
                categoryId: cId,
                serviceId,
                serviceProviderId: sId, 
                addressId:_id, 
                "scheduleDate": iso8601String,
                "scheduleTime":selectedTime,
                addDetails
            }

            try {
                const response = await axios.post("/api/service-booking", formData, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })

                enqueueSnackbar( `${serviceProviderName} service booking success !`, {
                    variant: 'success',
                    autoHideDuration: 3000, 
                })

                if(!_.isEmpty(response.data)){
                    setTimeout(()=>{
                        navigate("/profile/my-orders", {state: response.data})
                    }, 2000)
                }
                
            }catch(err){
                enqueueSnackbar( err.response.data.error || err.message, {
                    variant: 'error',
                    autoHideDuration: 5000, 
                })
                Array.isArray(err.response.data.error) && setServerErrors(err.response.data.error)
            }
        }  
    }

    const handleEditClickMobile = () => {
       alert("Please refresh page for once mobile number updated !")
    }

    const handleEditClickAddress = () => {
        alert("Please refresh page once address updated !")
    }


    return (
        <>
            <div className="error-container">
                {serverErrors?.length > 0 && (
                    <Alert variant="danger" className="custom-alert-width">
                        <ul>
                            {serverErrors.map((ele, i)=>{
                                return (
                                    <li key={i}>{ele.msg}</li>
                                )
                            })}
                        </ul>
                    </Alert>
                )}
            </div>
            <Container className="mt-4 form_custom">
            <h3 className="mt-2 text-center">Confirm Booking Info</h3>
            <Form onSubmit={handleBooking}>
                <Row className="mt-5">
                    <Col md={2}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" defaultValue={firstName} disabled />
                    </Col>

                    <Col md={3}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" defaultValue={email} disabled />
                    </Col>

                    <Col md={3}>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" defaultValue={mobileNumber}  disabled/>
                        {formErrors.mNumber && <span className="form_err_custom">{formErrors.mNumber}</span>}
                    </Col>

                    <Col md={1}>
                        <Link to="/profile/update-profile" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="edit_link_custom"
                            onClick={handleEditClickMobile}
                        > Edit
                        </Link>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={8}>
                        <Form.Label>Address</Form.Label>
                        {address.length > 0 ? ( 
                            <Form.Control 
                                type="text" 
                                defaultValue={userAddress}  
                                disabled
                            />
                            ) : (
                                <Form.Control 
                                type="text" 
                                defaultValue={""}  
                                disabled
                                />
                            )
                        }
                        {formErrors && <span className="form_err_custom">{formErrors.address}</span>}
                    </Col>
                    <Col md={2}>
                        <Link to="/profile/address-form" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="edit_link_custom"
                            onClick={handleEditClickAddress}
                        >Edit
                        </Link>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={3}>
                        <Form.Label>Service Provider Name</Form.Label>
                        <Form.Control type="text" defaultValue={serviceProviderName} disabled />
                    </Col>

                    <Col md={3}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" defaultValue={title} disabled />
                    </Col>

                    <Col md={3}>
                        <Form.Group controlId="serviceId">
                            <Form.Label>Service Type</Form.Label>
                            <Form.Control as="select" 
                                value={serviceId} 
                                onChange={(e) => setServiceId(e.target.value)} 
                            >
                                <option value="" >Select service type</option>
                                {service.map(ele => <option key={ele._id} value={ele._id}>{ele.serviceName}</option>)}
                            </Form.Control>
                        </Form.Group>
                        {formErrors && <span className="form_err_custom">{formErrors.serviceId}</span>}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4}>
                        <Form.Group controlId="calendar">
                        <Form.Label>Select Date:</Form.Label>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            minDate={tomorrow}
                            maxDate={endOfMonth}
                        />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="time">
                        <Form.Label>Select Time Slot:</Form.Label>
                        <Form.Control as="select" onChange={e => setSelectedTime(e.target.value)} value={selectedTime || ''}>
                            <option value="" disabled>Select slot</option>
                            {selectedDate && generateTimeSlots(8, 20, 2).filter(timeSlot => !isSlotBooked(formatDate(selectedDate), timeSlot)).map((timeSlot, index) => (
                            <option key={index} value={timeSlot}>{timeSlot}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>
                        {formErrors && <span className="form_err_custom">{formErrors.selectedTime}</span>}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={12}>
                        <Form.Group controlId="addDetails">
                        <Form.Label>Additional Details</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter additional details" value={addDetails} onChange={(e) => setAddDetails(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-5 mb-4">
                    <Col md={12} className="text-center mb-4">
                        <Button variant="primary" type="submit">Confirm</Button>
                    </Col>
                </Row>
            </Form>
            </Container>
        
            <div className="container mt-4">
                <ShowReviews reviews={reviews} />
            </div>
        </>
    )
}

export default BookingForm