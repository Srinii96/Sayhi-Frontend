import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useLocation, useNavigate } from "react-router-dom"
import axios from '../../../config/axios'
import StarRatings from 'react-star-ratings'

const ReviewForm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { oId } = location.state
    const { _id, serviceProviderName } = location.state.serviceProvider

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

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

        alert("Thanks for the review")
        navigate('/')

        } catch (error) {
            console.log('Error submitting review:', error)
        }
    }

  return (
    <Row>
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
