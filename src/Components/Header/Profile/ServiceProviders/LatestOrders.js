import { Row, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { FadeLoader } from "react-spinners";
import axios from "../../../../config/axios"
import "./LatestOrders.css"

const LatestOrders = () => {
    const [ loading, setLoading ] = useState(true)
    const [ orders, setOrders ] = useState([]) 

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await axios.get("/api/service-booking", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                setOrders(response.data)
            }catch(err){
                console.log(err)
            }
        })()

    }, [])

    const handleUpdateOrderStatus = async (res, id)=>{
        try {
            const { data } = await axios.put(`/api/orders/${id}/${res}`, {}, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            const removeId = orders.filter( ele => ele._id !== data.id)
            setOrders(removeId)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <Row>
        {!orders.length > 0 ? (
            <div className="d-flex justify-content-center mt-4">
                <FadeLoader
                    color={"#7aa9ab"}
                    loading={loading}
                    size={30}
                />

                <h4>Empty.....</h4>
            </div>
        ) : (
            <div className="m-4">
            <h3>Orders List</h3>
                {orders.map((ele) => (
                    <div key={ele._id} className="order_card_custom mt-4">
                        <div className="service-provider-info">
                            <div className="order_image_container">
                                <img
                                    src={ele.userId?.profilePicture?.url || process.env.PUBLIC_URL + '/Images/logos/service-pic.jpg'}
                                    alt="customer"
                                />
                            </div>
                            <div>
                                <div>
                                    <h4 className="order_service_font">Required service : 
                                        <span className="m-4">{ele.categoryId.title} - {ele.serviceId.serviceName}</span>
                                    </h4>
                                </div>
                                <p>
                                    <strong className="m-4">Customer Name - </strong> {ele.customerName},
                                    <strong className="m-4">Email - </strong> {ele.email}, 
                                    <strong className="m-4">Mobile - </strong>  +91 {ele.mobileNumber}
                                </p>
                                <p>
                                    <strong className="m-4">Booking Date - </strong> {ele.scheduleDate.split("T")[0]},
                                    <strong className="m-4">Time slot - </strong> {ele.scheduleTime}
                                </p>
                                <p>
                                    <strong className="m-4">Address- </strong> {
                                    `${ele.addressId.doorNo}, ${ele.addressId.buildingName}, ${ele.addressId.locality} , ${ele.addressId.landmark} , ${ele.addressId.city} - ${ele.addressId.pinCode}.`
                                    }
                                </p>
                                { ele.addDetails && 
                                    <p>
                                        <strong className="m-4">Add Info - </strong> { ele.addDetails }
                                    </p>
                                }
                            </div>
                        </div>
                        <div>
                            <Button 
                                className="btn btn-success mx-4"
                                onClick={() => handleUpdateOrderStatus("accept", ele._id)}
                            >Accept</Button>
                            <Button 
                                className="btn btn-danger mx-4"
                                onClick={() => handleUpdateOrderStatus("reject", ele._id)}
                            >Reject</Button>
                        </div>    
                    </div>
                ))}
            </div>
        )}
    </Row>
  )
}

export default LatestOrders