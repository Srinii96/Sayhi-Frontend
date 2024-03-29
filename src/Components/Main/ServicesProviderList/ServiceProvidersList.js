import { Row, Col, Alert, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import _ from "lodash"
import {Link, useParams} from "react-router-dom"
import Swal from "sweetalert2"
import { useSnackbar } from 'notistack'
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
  const { enqueueSnackbar } = useSnackbar()

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
  const [page, setPage] = useState(1)

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
        enqueueSnackbar('Error: ' + err.message, {
          variant: 'error',
          autoHideDuration: 5000, 
        })
      }
    }
    checkLocationPermission()

  }, [])

  useEffect(()=>{
    if(!_.isEmpty(location)){
      (async ()=>{
        const { latitude, longitude } = location
        try {
          const { data } = await axios.get(`/api/service-provider/${id}?longitude=${longitude}&latitude=${latitude}&page=${page}`, {
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
  }, [location, id, page])

  const handleServiceChange = (id)=>{
    const filteredData = serviceProviders.filter(ele => {
      return ele.serviceIds.some(service => service._id === id)
    })
    
    setServiceProviders(filteredData)
  }

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
          <ServiceNames serviceProviders={serviceProviders} handleServiceChange={handleServiceChange} />   
        </Col>

        <Col className="mb-3 col-6">
          <ServiceProvidersItem serviceProviders={serviceProviders} />
          { serviceProviders.length === 4 && <Button
            className="float-end" 
            onClick={() => setPage(page + 1)}
            >Next</Button>}
          {page > 1 && <Button 
            className="float-start"
            onClick={() => setPage(page - 1)}>previous
          </Button>}
        </Col >

        <Col className="col-3">
          <ServiceAds />
        </Col>
      </Row>
    </>
  )
}

export default ServiceProvidersList