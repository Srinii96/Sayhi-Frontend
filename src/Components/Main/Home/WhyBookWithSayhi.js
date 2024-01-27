import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faUserCheck, faPenToSquare, faIndianRupeeSign, 
    faScrewdriverWrench, faHeadset } from '@fortawesome/free-solid-svg-icons'

const WhyBookWithSayhi = () => {
  return (
    <Row className="mt-4 mb-4">
        <Col className="mt-4 custom_why_services">
            <h3>Why Services At Your Home </h3>
        </Col>
        <Row className="mt-4">
            <Col className="custom_why_services">
                <>
                    <span>
                        <FontAwesomeIcon icon={faCalendarCheck} size='4x'/>
                    </span>
                    <p><b>Scheduled</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faUserCheck} size='4x'/> <br />
                    </span>
                    <p><b>Verified Person</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faPenToSquare} size='4x'/> <br />
                    </span>
                    <p><b>Service Warranty</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>  
                        <FontAwesomeIcon icon={faIndianRupeeSign} size='4x'/> <br />
                    </span>
                    <p><b>Transparent Pricing</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faCreditCard} size='4x'/> <br />
                    </span>
                    <p><b>Online Payments Only</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faScrewdriverWrench} size='4x'/> <br />
                    </span>
                    <p><b>Customized Services</b></p>
                </>
            </Col>

            <Col className="custom_how_works">
                <>
                    <span>
                        <FontAwesomeIcon icon={faHeadset} size='4x'/> <br />
                    </span>
                    <p><b>Customer Support</b></p>
                </>
            </Col>
        </Row>
    </Row>
    )
}

export default WhyBookWithSayhi