import { Row, Col, Alert } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import _ from "lodash"
import {Link, useParams} from "react-router-dom"
import Swal from "sweetalert2"
import "./style.css"
import reducerContext from "../../../contextApi's/contextAPI"
import OfferInfo from "../Home/OfferInfo"
import axios from "../../../config/axios"
import ServiceNames from "./ServiceTypes"
import ServiceProvidersItem from "./ServiceProvidersItem"
import ServiceAds from "./ServiceAds"

const ServiceProvidersList = () => {
  const { id } = useParams()
  const { state } = useContext(reducerContext)

  const containerStyles = {
    display: 'flex',
    width: 'max-content',
    animationName: state.search ? 'none' : 'marqueeRight 8s linear infinite',
    animationDuration: '8s',
    animationTimingFunction: 'linear',
    animationDelay: '2s',
    position: 'relative',
  }

  const [location, setLocation] = useState({})
  const [serviceProviders, setServiceProviders] = useState([])
  const [error, setError] = useState("")

  useEffect(()=>{
    const redirectUserToSettings = () => {        
      if (!localStorage.getItem('locationAlertShown')) {
        localStorage.setItem('locationAlertShown', 'true')

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Allow location access is must required to use services in this website. To enable location access, please go to your browser settings and allow location permissions.",
        })        
      }
    }

    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              resolve({ latitude, longitude })
            },
            (error) => {
              reject(error)
            }
          )
        } else {
          reject(new Error("Geolocation is not supported by this browser."))
        }
      })
    }

    const checkLocationPermission = async () => {
      try{
        const token = localStorage.getItem("token")
        if (_.isEmpty(location) && token) {
          try {
            const position = await getUserLocation()
              setLocation({ "longitude": position.longitude, "latitude": position.latitude })
          }catch(error) {
            redirectUserToSettings()
          }
        }
      }catch(err){
        console.error('Error:', err)
      }
    }
    checkLocationPermission()

  }, [])

  useEffect(()=>{
    if(!_.isEmpty(location)){
      (async ()=>{
        const { latitude, longitude } = location
        try {
          const { data } = await axios.get(`/api/service-provider/${id}?longitude=${longitude}&latitude=${latitude}`, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
          setServiceProviders(data)
        }catch(err){
          setError(err.message)
        }
      })()
    }
  }, [location])

  useEffect(()=>{
    console.log("Id changed")
  }, [id])
  
  return (
    <>
      <div className="error-container">
        {error && (
          <Alert variant="danger" className="custom-alert-width">
            Error occurred: {error}
          </Alert>
        )}
      </div>

      <Row>
        <OfferInfo />
      </Row>

      <Row className="my-3">
        <h3>Services</h3>
        <div className="category_main_custom_r mt-3">
          <div className='category_list_custom_r' >
            <div className="image-container_r" style={containerStyles}>
              {state.categories && 
                _.chain(state.categories)
                .sortBy('title')
                .filter(ele => ele.title.toLowerCase().includes(state.search.toLowerCase()))
                .map((ele)=>{
                  return(
                    <div key={ele._id} className="slide_r">
                      <Link to={`/ServiceProvidersList/${ele._id}`} className="text-decoration-none">
                        <img
                          className="slide_image_r" 
                          src={ele.picture.url} 
                          alt={ele.title}
                        />
                        <p className="rounded-pill">{ele.title}</p>
                      </Link>
                    </div>
                  )
                })
              .value()}
            </div>
           </div>
        </div>
      </Row>
      
      <Row className="my-4">
        <Col className="col-3">
          <ServiceNames serviceProviders={serviceProviders} />
            
        </Col>

        <Col className="col-6">
          <ServiceProvidersItem serviceProviders={serviceProviders} />
        </Col >

        <Col className="col-3">
          {/* <ServiceAds /> */}
        </Col>
      </Row>
    </>
  )
}

export default ServiceProvidersList