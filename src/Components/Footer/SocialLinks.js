import { Row, Col } from 'reactstrap'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   
    faSquareXTwitter, 
    faSquareFacebook, 
    faSquareInstagram, 
    faLinkedin, 
    faSquareYoutube, 
    faSquareWhatsapp
} from '@fortawesome/free-brands-svg-icons'

const SocialLinks = ()=>{ 

    return(
        <div>
            <Row xs="auto" className="justify-content-center custom_font">
                <h4>Follow us on</h4>
                <Col className="mb-3">
                    <a href="https://twitter.com/i/flow/login" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faSquareXTwitter} size="2x"  style={{color:"#1DA1F2"}}/>
                    </a>
                </Col>
                <Col className="mb-3">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faSquareFacebook} size="2x" style={{color:"#3b5998"}} />
                    </a>
                </Col>
                <Col className="mb-3">
                    <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faSquareInstagram} size="2x" style={{color:"#bc2a8d"}} />
                    </a>
                </Col>
                <Col className="mb-3">
                    <a href="https://www.linkedin.com/login" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" style={{color:"#0077b5"}} />
                    </a>
                </Col>
                <Col className="mb-3">
                    <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faSquareYoutube} size="2x" style={{color:"#FF0000"}} />
                    </a>
                </Col>
                <Col className="mb-3">
                    <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faSquareWhatsapp} size="2x" style={{color:"#25D366"}} />
                    </a>
                </Col>
            </Row>
        </div>
    )
}

export default SocialLinks