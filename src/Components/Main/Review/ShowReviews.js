import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser } from '@fortawesome/free-regular-svg-icons'
import { Card } from 'react-bootstrap'

const ShowReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          size="lg"
          color={i <= rating ? '#FFA500' : '#D3D3D3'}
        />
      )
    }
    return stars
  }

  return (
    <div>
      <h3>Review & Ratings</h3>
      {
        reviews.length > 0 ? (
          <>
            {reviews.map((review, index) => (
            <Card key={index} className="m-3">
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faUser} size="1x" />
                  <span className='m-4' style={{ fontWeight: 'bold' }}>User @{index + 1}</span>
                </Card.Title>
                <Card.Subtitle className="mt-2 text-muted">
                  Rating: {renderStars(review.rating)}
                </Card.Subtitle>
                <Card.Text className="mt-4 text-muted">Comment: {review.comment}</Card.Text>
              </Card.Body>
            </Card>
            ))}
          </>
        ) : (
          <>
            <h3 className='text-center mb-4'>No reviews.......</h3>
          </>
        )
      }
    </div>
  )
}

export default ShowReviews
