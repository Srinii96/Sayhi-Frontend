import { Row, Col } from 'reactstrap'

const BusinessInfo = () => {
  return (
    <Row className="mt-4">
        <Col xs="2">
            <div 
                className="box border 
                border-dark 
                custom-business_info "
            >45+ Services</div>
        </Col>
                
        <Col xs="2">
            <div 
                className="box border 
                border-dark 
                custom-business_info"
            >3200+ Cities</div>
        </Col>        
                
        <Col xs="3"> 
            <div 
                className="box border 
                border-dark 
                custom-business_info"
            >280+ Trusted Professionals</div>
        </Col>
                
        <Col xs="3">
            <div 
                className="box border 
                border-dark 
                custom-business_info"
        >750+ Happy customers</div>
            
        </Col>
            <Col xs="2">
                <div 
                className="box border 
                border-dark 
                custom-business_info"
            >550+ Reviews</div>
        </Col>
    </Row>
  )
}

export default BusinessInfo