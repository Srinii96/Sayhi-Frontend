import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { Button, Row, Col, Carousel } from 'react-bootstrap'
import { toast } from "react-toastify"
import axios from "../../../config/axios"
import reducerContext from "../../../contextApi's/contextAPI"
import "./style.css"

const UserRegister = ()=>{
    const navigate = useNavigate()
    const {state, dispatch} = useContext(reducerContext)
    const [serverErrors, setServerErrors] = useState([])

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "confirmPassword": "",
            "checkbox": false
        },
        
        validationSchema: Yup.object({
            
            "firstName": Yup.string().trim("First name cannot include leading and trailing spaces").strict(true)
            .min(3, "First name should be min 3 characters")
            .matches(/^[A-Za-z]+$/, 'First name should contain only alphabetic characters')
            .required("First name is Required"),

            "lastName": Yup.string().trim("Last name cannot include leading and trailing spaces").strict(true)
            .min(1, "Last name should be min 1 character")
            .matches(/^[A-Za-z]+$/, 'Last name should contain only alphabetic characters')
            .required("Last name is Required"),

            "email": Yup.string().trim().strict(true)
            .email("Not a valid e-mail address")
            .test('is-lowercase', 'Email must be lowercase', value => value === value.toLowerCase())
            .required("Email is required"),

            "password": Yup.string().trim().strict(true)
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password must be at most 32 characters")
            .test('uppercase', 'Password must contain at least one uppercase letter', value =>
                /[A-Z]/.test(value || ''))
            .test('lowercase', 'Password must contain at least one lowercase letter', value =>
                /[a-z]/.test(value || ''))
            .test('numeric', 'Password must contain at least one numeric character', value =>
                /[0-9]/.test(value || ''))
            .test('symbol', 'Password must contain at least one symbol', value =>
                /[!@#$%^&*()]/.test(value || ''))
            .required("Password is required"),

            "confirmPassword": Yup.string().trim().strict(true)
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must be match')
            
        }),

        onSubmit: async (values, {resetForm})=>{
            const {firstName, lastName, email, password} = values
            const formData = {firstName, lastName, email, password}
            
            try{
                const userRegister = await axios.post("/api/user-register", formData)
                setServerErrors([])
                toast.success(`${userRegister.data.msg}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(()=>{
                    navigate("/sign-in")
                }, 3000)  
            }catch(err){
                setServerErrors(err.response.data.error)
                toast.error(err.response.data.error[0].msg, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        },
    })

    const sliderImages = [
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-3.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-2.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-4.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-1.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-5.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-6.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-7.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-8.jpg',
        process.env.PUBLIC_URL + '/Images/user-sign-up/sign-up-9.jpg',
    ]
      

    const imageStyle = {
        height: '290px', // Set the desired height for the images
        objectFit: 'cover', // To maintain aspect ratio without stretching
        border: 'none',
        borderRadius: '60px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transform: 'scale(0.95)', // Slightly scale down the image to give a depth effect
    }

    return(
        <Row>
            <>
                
            </>
            <Col className="col-7 mt-5">
                <Carousel interval={2000} controls={false} indicators={false} touch={false}>
                    {sliderImages.map((img, i) => (
                        <Carousel.Item key={i}>
                            <img
                            style={imageStyle}
                            className="d-block w-100"
                            src={img}
                            alt={`Slide ${i + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>

            <Col className="col-5 user_form_custom mb-5 mt-2">
                <Row className="text-center">
                    <h2>Register with us </h2> <br />
                </Row>

                <form onSubmit={handleSubmit} autoComplete="off">       
                <Row className="justify-content-center">
                    <Col className="col-4">
                        <label 
                            className="form-label" 
                            htmlFor="firstName"
                        >First Name </label>
                        <input
                            className="form-control" 
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Jack"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                        />
                        <div className="text-center">
                            { errors.firstName && touched.firstName ? (
                            <div style={{ color: "red" }}>{errors.firstName}</div>
                            ): null } <br />
                        </div>
                    </Col> 

                    <Col className="col-4">
                        <label 
                            className="form-label" 
                            htmlFor="lastName"
                        >Last Name</label>
                        <input
                            className="form-control" 
                            autoComplete="off"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Sparrow"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={errors.firstName}
                        />
                        <div className="text-center">
                            { errors.lastName && touched.lastName ? (
                            <div style={{ color: "red" }}>{errors.lastName}</div>
                            ) : null } <br />
                        </div>    
                    </Col>
                </Row>
                        
                <Row className="justify-content-center">
                    <Col className="col-5">
                        <label 
                            className="form-label" 
                            htmlFor="email"
                        > Email</label> 
                        <input 
                            className="form-control"
                            autoComplete="off"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="jacksparrow98@gmail.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={errors.lastName}
                        /> 
                        <div className="text-center">
                            { errors.email && touched.email ? (
                            <div style={{ color: "red" }}>{errors.email}</div>
                            ) : null } <br />
                            {serverErrors[0]?.msg && <span style={{ color: "red" }}> {serverErrors[0].msg}</span>}
                        </div>
                    </Col>
                </Row>

                <Row className="row justify-content-center">
                    <Col className="col-4">
                        <label 
                            className="form-label" 
                            htmlFor="password"
                        >Password</label>
                        <input 
                            className="form-control"
                            autoComplete="off"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="exaplE345@"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={errors.email}
                        />
                        <div className="text-center">
                            { errors.password && touched.password ? (
                            <div style={{ color: "red" }}>{errors.password}</div>
                            ) : null } <br />
                        </div>
                    </Col>

                    <Col className="col-4">
                        <label 
                            className="form-label" 
                            htmlFor="confirmPassword"
                        >Confirm Password</label>
                        <input
                            className="form-control"
                            autoComplete="off" 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="exaplE345@"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={errors.password}
                        /> 
                        <div>
                            { errors.confirmPassword && touched.confirmPassword ? (
                            <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                            ) : null } <br />
                        </div>
                    </Col>
                </Row>
                        
                <div className="text-center mx-auto p-2">
                    <p>Already a member ?  
                        <Link 
                            className="bg-light rounded-pill"
                            to="/sign-in"
                            onClick={()=>{
                                dispatch({
                                    type: "SIGN_IN_TOGGLE",
                                    payload: !state.toggle
                                })
                            }}
                        > Sign In
                        </Link>
                    </p>
                </div>

                <div className="form-check text-center mx-auto p-1">
                    <p>
                        <label htmlFor="checkbox">
                        <input 
                            className="form-check-input"
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            value={values.checkbox}
                            onChange={handleChange}
                            disabled={errors.confirmPassword}
                        /> I accept the Terms of Use & Privacy policy.
                        </label>
                    </p>
                </div>

                <div className="text-center mx-auto p-2">
                    <Button 
                        className="btn btn-light"
                        style={{backgroundColor: "white"}} 
                        disabled={!values.checkbox} 
                        type="submit" 
                    >Register</Button>
                </div>        
                </form>
            </Col>
        </Row>
    )
}

export default UserRegister