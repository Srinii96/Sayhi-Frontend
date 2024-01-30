import { Col } from "reactstrap"
import {Routes, Route} from "react-router-dom"
import Home from "./Home/Home"
import UserRegister from "../Header/User/UserRegister"
import UserLogin from "../Header/User/UserLogin"
import ForgotPassword from "../Header/User/ForgotPassword"
import ResetPassword from "../Header/User/ResetPassword"
import UserProfile from "../Header/Profile/UserProfile"
import CategoriesList from "../Header/Categories/CategoriesList"
import RegisterAsPartner from "../Header/RegisterAsPartner/RegisterAsPartner"
import ServiceProvidersList from "./ServicesProviderList/ServiceProvidersList"
import PrivateRoute from "../../helpers/PrivateRouter"
import BookingForm from "../Main/Booking/BookingForm"
import PaymentSuccess from "./Payment/PaymentSuccess"
import PaymentFailure from "./Payment/PaymentFailure"
import ReviewForm from "./Review/ServiceReview"
import Maps from "../Header/Profile/ServiceProviders/Maps"

const Main = ()=>{
    return(
        <Col>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<UserRegister />} />
                <Route path="/sign-in" element={<UserLogin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="/profile/:activepage" element={
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                } 
                /> 

                <Route path="/categories-list" element={
                    <PrivateRoute>
                        <CategoriesList />
                    </PrivateRoute>
                } />
                <Route path="/register-as-a-partner" element={
                    <PrivateRoute>
                        <RegisterAsPartner />
                    </PrivateRoute>
                } />
                <Route path="/ServiceProvidersList/:id" element={
                    <PrivateRoute>
                        <ServiceProvidersList />
                    </PrivateRoute>
                } />
                <Route path="/confirm-booking" element={
                    <PrivateRoute>
                        <BookingForm />
                    </PrivateRoute>
                } />
                <Route path="/success" element={
                    <PrivateRoute>
                        <PaymentSuccess />
                    </PrivateRoute>
                } />
                <Route path="/failure" element={
                    <PrivateRoute>
                        <PaymentFailure />
                    </PrivateRoute>
                } />
                <Route path="/reviews" element={
                    <PrivateRoute>
                        <ReviewForm />
                    </PrivateRoute>
                } />
                <Route path="/maps" element={
                    <PrivateRoute>
                        <Maps />
                    </PrivateRoute>
                } />
            </Routes>
        </Col>
    )
}

export default Main