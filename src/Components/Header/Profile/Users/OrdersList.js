import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useSnackbar } from 'notistack'
import axios from "../../../../config/axios"
import PaymenModal from "./PaymentModal"

const OrdersList = (props) => {
  const { order, renderStatusImage, money:pay} = props
  const { enqueueSnackbar } = useSnackbar()

  const [showAmountModal, setShowAmountModal] = useState(false)

  const [selectedOrderId, setSelectedOrderId] = useState("")
  const [selectedBookingId, setSelectedBookingId] = useState("")
  const [ money, setMoney ] = useState("")

  const { doorNo, buildingName, city } = order.bookingId.addressId
  const date = order.bookingId.scheduleDate.split("T")[0]
  const amount = order.amount.toUpperCase()

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
      enqueueSnackbar("please enter amount", {
        variant: 'warning',
        autoHideDuration: 3000, 
      })
    }
  }
  
  useEffect(()=>{
    setMoney(pay)
  }, [pay])

  return (
    <div className="order_card_custom" key={order._id}>
        <div className="service-provider-info">
        <div className="order_image_container">
            <img
            src={order.bookingId.serviceProviderId.userId?.profilePicture.url}
            alt="service-provider"
            />
        </div>
        <div>
            <div>
            <h2>{order.bookingId.serviceProviderId.serviceProviderName}</h2>
            </div>
            <p className="mt-4">
            <strong className="m-4">Category- </strong> {order.bookingId.categoryId.title}, 
            <strong className="m-4">Service Type-</strong> {order.bookingId.serviceId.serviceName}
            </p>
            <p>
            <strong className="m-4">Customer Name - </strong> {order.bookingId.customerName},
            <strong className="m-4">Email - </strong> {order.bookingId.email}, 
            <strong className="m-4">Mobile - </strong>  +91 {order.bookingId.mobileNumber}
            </p>
            <p>
            <strong className="m-3">Address- </strong> {`${doorNo}, ${buildingName}, ${city}`}. 
            <strong className="m-2">Booking Date - </strong> {date},
            <strong className="m-3">Time slot - </strong> {order.bookingId.scheduleTime}
            </p>
        </div>
        </div>

        <div className="order-status-container">
            <div className="order-status-info">
                <h3 className="order_status_font">
                Order status - {order.orderStatus}
                <span>{renderStatusImage(order.orderStatus)}</span>
                </h3>
            </div>

            <div>
                <h3 className="order_status_font">
                Amount - {amount}
                </h3>
            </div>

           { order.bookingId.isEnded && <div className="order-payment-btn text-right">
              <Button 
                className="btn btn-success"
                onClick={() => handlePayButtonClick(order._id, order.bookingId._id)}
              >PAY</Button>
            </div>}

            <PaymenModal
              money={money}
              show={showAmountModal}
              handleClose={handlePaymentModalClose}
              handlePaymentSubmit={handlePaymentSubmit}
            />
        </div>
    </div>
  )
}

export default OrdersList