import { useState } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from "react-router-dom"
import { useSnackbar } from 'notistack'
import axios from '../../../config/axios'
import StarRatings from 'react-star-ratings'

const ReviewForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const { oId } = location.state
    const { _id, serviceProviderName } = location.state.serviceProvider

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [serverErrors, setServerErrors] = useState([])

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const formData = {
        comment, rating, "orderId": oId, "serviceProviderId": _id
        }

        try {
        const { data } = await axios.post('/api/reviews', formData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })

        enqueueSnackbar("Thanks for the review", {
            variant: 'success',
            autoHideDuration: 5000, 
        })
        navigate('/')

        }catch(err){
            enqueueSnackbar( 'Error submitting review: '+ err.response.data.error || err.message, {
                variant: 'error',
                autoHideDuration: 3000, 
            })
            err.response.data.error[0] && setServerErrors(err.response.data.error)
        }
    }

  return (
    <Row>
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
        <Col className="d-flex justify-content-center align-items-center mt-2" 
        style={{ height: "58vh" }}>
            <Form onSubmit={handleFormSubmit}>
                <h3>Review for {serviceProviderName}</h3>
                <Row className='mt-5'>
                    <Col>
                        <Form.Group controlId="rating">
                            <Form.Label>My Rating - </Form.Label> <br />
                            <StarRatings
                            rating={rating}
                            starRatedColor="#FFD700"
                            starHoverColor="#FFD700"
                            starDimension="40px"
                            changeRating={(newRating) => setRating(newRating)}
                            numberOfStars={5}
                            name='rating'
                            halfStars={true}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col>
                    <Form.Group controlId="comment">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                        as="textarea"
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    </Col>
                </Row>
                
                <Row className='m-3'>
                    <Button variant="primary" type="submit">
                        Submit Review
                    </Button>
                </Row>

                    {/* Skip Button */}
                <Row className="m-2">
                    <Button 
                    onClick={() => navigate('/')}
                    className="btn btn-secondary">
                        Skip
                    </Button>
                </Row>
            </Form>
        </Col>
    </Row>
  )
}

export default ReviewForm
