import { Row, Col } from 'reactstrap'
import { Link } from "react-router-dom"

const BusinessLinks = ()=>{
    return(
        <Row>
            <Col>
                <Link to="/about-us" className="mx-2 custom_font_links
                    text-decoration-none">About us</Link> |
                <Link to="/blogs" className="mx-2 custom_font_links
                text-decoration-none">Blogs</Link> |
                <Link to="terms-conditions" className="mx-2 custom_font_links
                text-decoration-none">Terms & Conditions</Link> |
                <Link to="/booking-policy" className="mx-2 custom_font_links
                text-decoration-none">Booking Policy</Link> |
                <Link to="/cancellation-policy" className="mx-2 text-decoration-none
                custom_font_links">Cancellation Policy</Link> |
                <Link to="/faq" className="mx-2 text-decoration-none
                custom_font_links">FAQ</Link> |
                <Link to="/support" className="mx-2 text-decoration-none
                custom_font_links">Support</Link>
            </Col>
        </Row>
    )
}

export default BusinessLinks