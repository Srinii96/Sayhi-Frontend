import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Row, Button } from "react-bootstrap"
import _ from "lodash"
import io from "socket.io-client"
import { jwtDecode } from "jwt-decode"
import axios from "../../../../config/axios"
import "./MyOrders.css"
import OrdersList from "./OrdersList"
import PaymentModal from "./PaymentModal"

const socket = io.connect("http://localhost:3699")

const MyOrders = () => {
  const location = useLocation()

  const { bookingId, orderId } = !_.isEmpty(location.state) && location.state

  const [ latestOrder, setLatestOrder ] = useState({})
  const [ orders, setOrders ] = useState([])

  const [userId, setUserId] = useState("")
  const [showAmountModal, setShowAmountModal] = useState(false)

  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [selectedBookingId, setSelectedBookingId] = useState("")

  useEffect(()=>{
    socket.emit("joinRoom", userId)
  }, [userId])

  useEffect(()=>{
    if(localStorage.length > 0){
        const { id } = jwtDecode(localStorage.getItem("token"))
        setUserId(id)
    }
  }, [])

  useEffect(()=>{
    if(bookingId && orderId){
      (async ()=>{
        try {
          const { data }  = await axios.get(`/api/orders/${orderId}/${bookingId}`, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
          setLatestOrder({...data})
        }catch(err){
          console.log(err)
        }
      })()
    }
  }, [bookingId, orderId])

  useEffect(()=>{
    (async ()=>{
      try {
        const { data } = await axios.get('/api/orders', {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })

        if(bookingId && orderId){
          const updateOrders = data.filter(ele => ele._id !== orderId)
          setOrders(updateOrders)
        }else{
          setOrders(data)
        }
        
      }catch(err){
        console.log(err)
      }
    })()
  }, [bookingId, orderId])

  useEffect(()=>{
    socket.on("updateOrderStatus", (data)=>{
      if(Object.values(latestOrder).includes(data._id)){
        setLatestOrder((latestOrder) => ({
          ...latestOrder,
          orderStatus: data.orderStatus
        }))
      }else{
        const result = orders.map((ele)=>{
          if(ele._id === data._id){
            return {
              ...ele,
              orderStatus: data.orderStatus
            }
          }else{
            return {...ele}
          }
        })
        setOrders(result)
      }
    })
  }, [socket, latestOrder, orders])
  
  
  useEffect(()=>{
    socket.on("updateOrderStatusEnd", (data)=>{
      const booking = Object.keys(latestOrder).length > 0 && latestOrder?.bookingId
      if(Object.values(booking).includes(data._id)){
        alert(data)
        setLatestOrder((latestOrder) => ({
          ...latestOrder,
          bookingId: {...latestOrder.bookingId, "isEnded": data.isEnded}
        }))
      }else{
        const result = orders.map((ele)=>{
          if(ele.bookingId._id === data._id){
            return {
              ...ele,
              bookingId: {...ele.bookingId, "isEnded": data.isEnded}
            }
          }else{
            return {...ele}
          }
        })
        setOrders(result)
      }
    })
  }, [socket, latestOrder, orders])

  const { doorNo, buildingName, city } = Object.keys(latestOrder).length > 0 && latestOrder?.bookingId?.addressId
  const date = Object.keys(latestOrder).length > 0 && latestOrder?.bookingId?.scheduleDate.split("T")[0]
  const amount = Object.keys(latestOrder).length > 0 && latestOrder?.amount.toUpperCase()
  
  const renderStatusImage = (status) => {
    switch (status) {
      case 'Pending':
        return <img 
          src={process.env.PUBLIC_URL + "/Images/status/pending.png"} 
          alt="Pending" 
          className="order_status_img"
        />
      case 'Accepted':
        return <img 
          src={process.env.PUBLIC_URL + "/Images/status/accepted.png"} 
          alt="Accepted" 
          className="order_status_img"
        />
      case 'Rejected':
        return <img 
        src={process.env.PUBLIC_URL + "/Images/status/rejected.png"} 
        alt="Rejected" 
        className="order_status_img"
        />
      default:
        return null
    }
  }

  const handlePayButtonClick = (oId, bId) => {
    setSelectedOrderId(oId)
    setSelectedBookingId(bId)
    setShowAmountModal(true)
  }

  const handlePaymentModalClose = () => {
    setShowAmountModal(false)
  }

  const handlePaymentSubmit = async (amount) => {
    if(amount){
      const formData = {
        amount: Number(amount),
        bookingId: selectedBookingId,
        orderId: selectedOrderId
      }

      const { data } = await axios.post("/api/payment", formData, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })

      //storing to local storage
      localStorage.setItem('stripId', data.id)

      //redirect to payment URL
      window.location = data.url
    }else{
    alert("please enter amount")
    }
  }
  
  return (
   <>
    <Row>
      <div className="m-4">
        <h3>New Order</h3>
        {bookingId && orderId ? (
          <div className="order_card_custom">
          <div className="service-provider-info">
            <div className="order_image_container">
              <img
                src={latestOrder?.bookingId?.serviceProviderId?.userId?.profilePicture?.url || process.env.PUBLIC_URL + '/Images/logos/service-pic.jpg'}
                alt="service-provider"
              />
            </div>
            <div>
              <div>
                <h2>{latestOrder?.bookingId?.serviceProviderId?.serviceProviderName}</h2>
              </div>
              <p className="mt-4">
                <strong className="m-4">Category- </strong> {latestOrder?.bookingId?.categoryId?.title}, 
                <strong className="m-4">Service Type-</strong> {latestOrder?.bookingId?.serviceId?.serviceName}
              </p>
              <p>
                <strong className="m-4">Customer Name - </strong> {latestOrder?.bookingId?.customerName},
                <strong className="m-4">Email - </strong> {latestOrder?.bookingId?.email}, 
                <strong className="m-4">Mobile - </strong>  +91 {latestOrder?.bookingId?.mobileNumber}
              </p>
              <p>
                <strong className="m-4">Address- </strong> {`${doorNo}, ${buildingName}, ${city}`}. 
                <strong className="m-4">Booking Date - </strong> {date},
                <strong className="m-4">Time slot - </strong> {latestOrder?.bookingId?.scheduleTime}
              </p>
            </div>
          </div>

          <div className="order-status-container">
            <div className="order-status-info">
              <h3 className="order_status_font">
                Order status - {latestOrder?.orderStatus}
                <span>{renderStatusImage(latestOrder?.orderStatus)}</span>
              </h3>
             
            </div>

            <div>
              <h3 className="order_status_font">
                Amount - {amount}
              </h3>
            </div>

            { latestOrder?.bookingId?.isEnded && <div className="order-payment-btn text-right">
                <Button 
                  className="btn btn-success"
                  onClick={() => handlePayButtonClick(latestOrder?._id, latestOrder?.bookingId?._id)}
                >PAY</Button>
              </div>
            }

            <PaymentModal
              show={showAmountModal}
              handleClose={handlePaymentModalClose}
              handlePaymentSubmit={handlePaymentSubmit}
            />
          </div>
          </div>
        ) : (
          <>
            <h3 className="order_service_font text-center">Empty.......</h3>
          </>
        ) }
      </div>
    </Row>

   <Row>
    <div className="m-4">
      <h3>Previous Orders</h3>
        {orders.length > 0 ? (
          orders.map((ele) => (
            <OrdersList key={ele._id} order={ele} renderStatusImage={renderStatusImage} />
          ))
        ) : (
          <h3 className="order_service_font text-center">Empty.......</h3>
        )}
    </div>
   </Row>
   </>
  )
}

export default MyOrders