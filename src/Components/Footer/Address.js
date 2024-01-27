import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileRetro } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-regular-svg-icons'
import "./style.css"

const Address = ()=>{
    return(
        <Row className="justify-content-center align-items-center">
            <Col xs="auto" className="custom_color_icon">
                <FontAwesomeIcon icon={faBuilding} size="2x" />
            </Col>

            <Col xs="8" className="custom_font_address">
                <b>141, Gandhi Bazar,</b>
                <b>Near Basavanagudi Circle, Basavanagudi,</b>
                <b>Bengaluru, Karnataka 560004.</b>
            </Col>

            <Col xs="5" className="custom_font mt-4" >
                <FontAwesomeIcon icon={faMobileRetro} size="2x" className="custom_color_icon" />
                <b>1800-100-1122</b>
            </Col>
        </Row>
    )
}

export default Address