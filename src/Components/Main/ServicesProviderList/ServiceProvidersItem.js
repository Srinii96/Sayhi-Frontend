import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useSnackbar } from 'notistack'


const ServiceProvidersItem = (props) => {
  const { serviceProviders } = props
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [userRole, setUserRole] = useState("")

  useEffect(()=>{
    if(localStorage.length > 0){
        const {role} = jwtDecode(localStorage.getItem("token"))
        setUserRole(role)
    }
  }, [])

  const handleBook = (id)=>{
    const result = serviceProviders.find(ele => ele._id === id)
    if(userRole === "user"){
      navigate("/confirm-booking", {state:result})
    }else{
      enqueueSnackbar( "You are unauthorised to book services", {
        variant: 'error',
        autoHideDuration: 5000, 
      })
    }
  }

  

  return (
    <div>
        <h2>Service Providers</h2>
          
        {
          serviceProviders.length === 0 ? (
            <div className="m-5">
              <h2 className="no-service-custom">No services are available in your area range.......</h2>
            </div>
          ) : (
            <div className="mt-4">
            {serviceProviders.map((ele, i) => (
            <div className="service-provider-card" key={i}>
              <div className="service-provider-info">
                <div className="image-container">
                  <img
                    src={ele.userId.profilePicture?.url || process.env.PUBLIC_URL + '/Images/logos/service-pic.jpg'}
                    alt="service-provider"
                  />
                </div>
                <div className="details">
                  <div className="header">
                    <h2>{ele.serviceProviderName}</h2>
                    <div className="rating">
                     <span>4.5</span>
                      <span>⭐</span>
                    </div>
                  </div>
                  <p className="description">
                    <strong>About:</strong> {ele.description}
                  </p>
                  <p>
                    <strong>Services:</strong> {ele.serviceIds.map(ele => ele.serviceName).join(", ")}<br />
                  </p>
                  <p>
                    <strong>Service Type:</strong> {ele.serviceType.join(', ')}<br />
                  </p>
                </div>
              </div>
              <div className="footer">
                <div className="authorized-dealer">
                  {/* Authorized dealer image */}
                  <img
                    src="https://cdn.shopify.com/s/files/1/0584/1259/7436/files/authorized-dealer.png?v=1650156610"
                    alt="authorized-dealer"
                  />
                  Authorized Dealer
                </div>
                <button 
                  className="book-button"
                  onClick={() => handleBook(ele._id)}
                >Book Now</button>
                <div className="verified-bottom-left">
                  {/* Verified image */}
                  <img
                    src="https://businessonline.pk/images/verified.png"
                    alt="Verified"
                  />
                  Verified
                </div>
              </div>
            </div>
            ))}
            </div>
          )
        }

        {/* <Button>Next</Button> */}
    </div>
  )
}

export default ServiceProvidersItem