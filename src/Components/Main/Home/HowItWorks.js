import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCommenting, faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const HowItWorks = () => {
  return (
    <Row className="mt-4">
        <Col className="mt-4 custom_how_works">
            <h3>How it works</h3>
        </Col>
        <Row className="mt-4">
            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faCircleCheck} size='3x'/> <br />
                    </span>
                    <b>Step 1</b>
                    <p>Book a Service</p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faCommenting} size='3x'/> <br />
                    </span>
                    <b>Step 2</b>
                    <p>Get Booking Details</p>
                </>
            </Col>
            
            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faLocationDot} size='3x'/> <br />
                    </span>
                    <b>Step 3</b>
                    <p>Live Tracking</p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faCreditCard} size='3x'/> <br />
                    </span>
                    <b>Step 4</b>
                    <p>Pay After Work is Done</p>
                </>
            </Col>
        </Row>
    </Row>
  )
}

export default HowItWorks