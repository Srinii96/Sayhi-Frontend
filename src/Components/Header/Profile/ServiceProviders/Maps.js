import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import RouteMap from "./RouteMap"

const Maps = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const address = useSelector((state)=>{
        return state.user.address
    })

    
  return (
    <div>
        <h3 className="d-flex justify-content-center my-4">Route Map to reach customer</h3>
        <div style={{height: '65vh' }}>
            {address.length > 0 ? (
                <div className="m-4">
                    <RouteMap address={address} userId={location.state} />
                    <button
                        className="m-4"
                        onClick={()=>{
                            navigate("/profile/accepted-orders")
                        }}
                    >Back to orders...</button>
                </div>
            ) : (
                <>
                    <strong>Kindly add your address to view route map.......</strong> <br />
                    <Link
                        to="/profile/address-form"
                    >Click here...</Link>
                </>
            )}
        </div>
    </div>
  )
}

export default Maps