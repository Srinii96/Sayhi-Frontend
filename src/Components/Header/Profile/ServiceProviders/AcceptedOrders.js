import { Row, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FadeLoader } from "react-spinners"
import { useSnackbar } from 'notistack'
import io from "socket.io-client"
import { jwtDecode } from "jwt-decode"
import axios from "../../../../config/axios"
import OtpModal from "./OtpModal"
import EnterAmount from "./EnterAmount"
import "./LatestOrders.css"

const socket = io.connect("http://localhost:3699")

const AcceptedOrders = () => {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true)
    const [ orders, setOrders ] = useState([]) 

    const [showOtpModal, setShowOtpModal] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [otp, setOtp] = useState("")

    const [showAmountModal, setShowAmountModal] = useState(false)
    const [amount, setAmount] = useState('')

    const [userId, setUserId] = useState("")

    useEffect(()=>{
        if(localStorage.length > 0){
            const { id } = jwtDecode(localStorage.getItem("token"))
            setUserId(id)
        }
    }, [])

    useEffect(()=>{
        socket.emit("joinRoom", userId)
    }, [userId])

    

    useEffect(()=>{
        (async ()=>{
            try {
                const { data } = await axios.get("/api/service-booking/accepted", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                setOrders(data)
            }catch(err){
                console.log(err.message)
            }
        })()

    }, [])

    const handleUpdateBookingStatus = async (res, id)=>{
        try {
            if(res === "otp"){
                const { data } = await axios.put(`/api/service-booking/${id}/${res}`, {}, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                setShowOtpModal(true)
                setSelectedOrderId(id)
            }else{
                const { data } = await axios.put(`/api/service-booking/${id}/${res}`, {}, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                const updateStatus = orders.map((ele)=>{
                    if(ele._id === data.id){
                        return {...ele, isStarted: data.isStarted}
                    }else{
                        return {...ele}
                    }
                })
                setOrders(updateStatus)
            }
        }catch(err){
            enqueueSnackbar( err.response.data.error || err.message, {
                variant: 'error',
                autoHideDuration: 5000, 
            })
        }
    }

    const handleOtpSubmit = async (res, id) => {
        try {
            const { data } = await axios.put(`/api/service-booking/${id}/${res}`, {otp}, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            setShowOtpModal(false)
            const updateStatus = orders.map((ele)=>{
                if(ele._id === data.id){
                    return {...ele, isEnded: data.isEnded}
                }else{
                    return {...ele}
                }
            })
            setOrders(updateStatus)
        } catch (err) {
            enqueueSnackbar( err.response.data.error || err.message, {
                variant: 'error',
                autoHideDuration: 5000, 
            })
        }
    }

    const handleAmountButtonClick = () => {
        setShowAmountModal(true)
    }
    
    const handleAmountModalClose = () => {
        setShowAmountModal(false)
    }

    const handleAmountSubmit = (amount)=>{
        setAmount(amount)
    }

    const sendMessage = () => {
        const userId = orders[0]?.userId._id
        socket.emit('privateMessage', { userId, amount })
    }

    useEffect(() => {
        if (amount !== '') {
            sendMessage()
        }
    }, [amount, orders])

    useEffect(()=>{
        socket.on("updatePaymentStatus", (data)=>{
            enqueueSnackbar( 'Payment is successfull !', {
                variant: 'info',
                autoHideDuration: 5000, 
            })
            
            setOrders(orders.filter(ele => ele._id !== data._id))
        })
    }, [socket])

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
                    <div key={ele._id} className="order_card_custom">
                        <div className="service-provider-info">
                            <div className="order_image_container">
                                <img
                                    src={ele.userId?.profilePicture?.url || process.env.PUBLIC_URL + '/Images/logos/service-pic.jpg'}
                                    alt="service-provider"
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
                                    }   <span
                                        className="mx-3"
                                        style={{ fontSize: '25px', padding: '5px' }}
                                        onClick={()=>{
                                            navigate('/maps', {state: orders[0].userId._id})
                                        }}
                                    >🗺️ <span style={{ fontSize: '10px'}}> 👈🏼 click here to view map</span></span>
                                </p>
                                { ele.addDetails && 
                                    <p>
                                        <strong className="m-4">Add Info - </strong> { ele.addDetails }
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {!ele.isStarted && <Button 
                                className="btn btn-warning mx-4"
                                onClick={() => handleUpdateBookingStatus("start", ele._id)}
                            >start</Button>}
                            { ele.isStarted && <Button 
                                className="btn btn-info mx-4"
                                onClick={() => handleUpdateBookingStatus("otp", ele._id)}
                            >End</Button>}
                            { ele.isEnded && <Button
                                onClick={handleAmountButtonClick}
                            >Enter amount
                            </Button>}

                            <EnterAmount 
                                show={showAmountModal}
                                handleClose={handleAmountModalClose}
                                handleAmountSubmit={handleAmountSubmit}
                            />
                        </div>    
                    </div>
                ))}
            </div>
        )}

        <OtpModal
            show={showOtpModal}
            handleClose={() => setShowOtpModal(false)}
            otp={otp}
            setOtp={setOtp}
            handleOtpSubmit={handleOtpSubmit}
            orderId={selectedOrderId}
        />
    </Row>
  )
}

export default AcceptedOrders