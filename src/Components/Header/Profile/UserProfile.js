import { Row } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import UserSideBar from "./UserSideBar"
import UpdateProfile from "./UpdatePassword/UpdateProfile"
import AddressForm from "./Address/AddressForm"
import MyOrders from "./Users/MyOrders"
import LatestOrders from './ServiceProviders/LatestOrders'
import AcceptedOrders from './ServiceProviders/AcceptedOrders'
import AddCategories from '../Categories/AddCategories'
import ServiceApprove from './Admin/ServiceApprove'
import Dashboard from './Admin/Dashboard/Dashboard'
import ScheduleCalender from './ServiceProviders/ScheduleCalender'
import "./UserProfile.css"

const UserProfile = () => {
  const { activepage } = useParams()

  const {profile, address} = useSelector((state)=>{
    return state.user
  })

  const userAddress = address.length > 0 && address[0]

  return (
    <Row className="user_profile">
      <div className="user_profile_In">
        <div className="user_profile_left">
          <UserSideBar />
        </div>
        <div className="user_profile_right">
          { activepage === "update-profile" && <UpdateProfile profile={profile} /> }
          { activepage === "address-form" && <AddressForm userAddress={userAddress} /> }
          { activepage === "my-orders" && <MyOrders /> }
          { activepage === "latest-orders" && <LatestOrders /> }
          { activepage === "accepted-orders" && <AcceptedOrders /> }
          { activepage === "categories-add" && <AddCategories /> }
          { activepage === "service-approve" && <ServiceApprove /> }
          { activepage === "dashboard" && <Dashboard /> }
          { activepage === "schedule-calender" && <ScheduleCalender /> }
        </div>
      </div>
    </Row>
  )
}

export default UserProfile