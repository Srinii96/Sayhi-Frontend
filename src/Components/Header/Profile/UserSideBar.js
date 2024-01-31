import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faBagShopping, faHouse, faPlus, faChartBar} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck, faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

import "./UserSideBar.css"

const UserSideBar = ({activepage}) => {
    const [userRole, setUserRole] = useState("")

    useEffect(()=>{
        if(localStorage.length > 0){
            const {role} = jwtDecode(localStorage.getItem("token"))
            setUserRole(role)
        }
    }, [])

  return (
    <div className="user_side_bar">
            <div className="user_side_bar_link">
                <Link to="/profile/update-profile">
                    <FontAwesomeIcon icon={faUserPen} size="2x" />
                    <p>Update Profile</p>
                </Link>
            </div>

            <div className="user_side_bar_link">
                { userRole !== "admin" && 
                    <Link to="/profile/address-form">
                        <FontAwesomeIcon icon={faHouse} size="2x" />
                        <p>Address</p>
                    </Link>
                }

                { userRole === "admin" && 
                    <Link to="/profile/categories-add">
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                        <p>Add Categories</p>
                    </Link>
                }               
            </div>

            <div className="user_side_bar_link">
                { (userRole === "selfEmployee" || userRole === "technician")  &&
                    <Link to="/profile/latest-orders">
                        <FontAwesomeIcon icon={faBagShopping} size="2x" />
                        <p>Latest Orders</p>
                    </Link>
                }
                { userRole === "admin" && 
                    <Link to="/profile/service-approve">
                        <FontAwesomeIcon icon={faCircleCheck} size="2x" />
                        <p>Approve List</p>
                    </Link>
                }

                { userRole === "user" && <Link to="/profile/my-orders">
                    <FontAwesomeIcon icon={faBagShopping} size="2x" />
                        <p>My Orders</p>
                    </Link>
                }
            </div>

            <div className="user_side_bar_link">
                { (userRole === "selfEmployee" || userRole === "technician") && 
                    <Link to="/profile/accepted-orders">
                        <FontAwesomeIcon icon={faCircleCheck} size="2x" />
                        <p>Accepted Orders</p>
                    </Link>
                }
                { userRole === "admin" && 
                    <Link to="/profile/dashboard">
                        <FontAwesomeIcon icon={faChartBar} size="2x" />
                        <p>Dashboard</p>
                    </Link>
                }
            </div> 

            <div className="user_side_bar_link">
                { (userRole === "selfEmployee" || userRole === "technician") && 
                    <Link to="/profile/schedule-calender">
                        <FontAwesomeIcon icon={faCalendarDays} size="2x" />
                        <p>Calender</p>
                    </Link>
                }
            </div>       
    </div>
  )
}

export default UserSideBar