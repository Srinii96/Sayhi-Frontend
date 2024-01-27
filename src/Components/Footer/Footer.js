import { Col } from 'reactstrap'
import BusinessLinks from "./BusinessLinks"
import SocialLinks from "./SocialLinks"
import WebsiteInfo from "./WebsiteInfo"
import Address from "./Address"
import CopyRights from "./CopyRights"

const Footer = ()=>{
    return(
        <>
            <Col md="8">
                <BusinessLinks />
            </Col>
            <Col xs="4">
                <SocialLinks />
            </Col>
            <Col xs="8">
                <WebsiteInfo />
            </Col>
            <Col xs="4">
                <Address />
            </Col>
            <Col className="text-center">
                <CopyRights />
            </Col>
        </>
    )
}

export default Footer