import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from "@fortawesome/free-solid-svg-icons"

const OfferInfo = () => {
  return (
    <Row>
        <Col>
            <div className="offer-container_custom">
                <div className="icon">
                    <FontAwesomeIcon icon={faBullhorn} />
                </div>

                <ul className="ticker">
                    <li>Refer your friends to SAYHI and earn 250rs reward amount when they use SAYHI services</li>
                    <li>Get Rs. 75 OFF on Electrician and Plumbing Services. Limited Time Offer! Use code SAYHI75</li>
                    <li>Get Rs. 150 OFF on Beauty Services. Limited Time Offer! Use code SAYHI150</li>
                </ul>
            </div>
        </Col>
    </Row> 
  )
}

export default OfferInfo
