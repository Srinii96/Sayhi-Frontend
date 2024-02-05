import { useFormik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate, useLocation  } from "react-router-dom"
import { useContext, useEffect } from "react"
import { Button, Row, Col } from 'reactstrap'
import { ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import "./style.css"
import reducerContext from "../../../contextApi's/contextAPI"
import axios from "../../../config/axios"

const UserLogin = ()=>{
    const navigate = useNavigate()
    const location = useLocation()
    const {state, dispatch} = useContext(reducerContext)

    // when a page refresh signInToggle.toggle value updating
    useEffect(()=>{
        dispatch({
            type: "SIGN_IN_TOGGLE",
            payload: true
        })
    }, [dispatch])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const message = queryParams.get('message')
        if (message) {
          toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
    }, [location.search])

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            "email": "",
            "password": "",
        },
        
        validationSchema: Yup.object({

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
            .required("Password is required")      
        }),

        onSubmit: async (values,{resetForm})=>{
            try{
                const userLogin = await axios.post("/api/user-login", values)
                resetForm()
                const token = userLogin.data.token
                localStorage.setItem("token", token)
                
                // Check if the response includes a redirectUrl
                if (userLogin.data.redirectUrl) {
                    window.location.href = userLogin.data.redirectUrl
                } else {
                    toast.success("Logged in successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    })

                    setTimeout(() => {
                    navigate("/")

                    dispatch({
                        type: "USER_LOGGED_IN",
                        payload: true,
                    })
                    }, 2000)
                }    
            } catch(err){
                toast.error( err.response.data.error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        }
    })

    const imageStyle = {
        width: "500px", // Set the desired width for the images
        height: '420px', // Set the desired height for the images
        objectFit: 'cover', // To maintain aspect ratio without stretching
    }

    return(
        <Row className="justify-content-center my-4">
             <ToastContainer />
            <Col className="col-6">
                <img 
                    style={imageStyle} 
                    className="img-fluid" 
                    src={process.env.PUBLIC_URL + "/Images/user-sign-up/sign-in.png"} 
                    alt="Sign-up" />
            </Col>

            <Col className="col-4 user_form_custom">
                <div className="text-center">
                    <h2>Sign in to your account</h2> <br />
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <Row className="justify-content-center">
                        <Col className="col-7">
                            <label 
                                className="form-label" 
                                htmlFor="email"
                            >Email</label> 
                            <input 
                                className="form-control"
                                autoComplete="off"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="jackdawson98@gmail.com"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            /> 
                            <div className="text-center">
                            { errors.email && touched.email ? (
                                <div style={{ color: "red" }}>{errors.email}</div>
                                ) : null 
                            } <br />
                            </div>
                        </Col>

                        <Col className="col-7">
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
                            placeholder="exaMple$345"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={errors.email}
                            />            
                            <div className="text-center">
                            { errors.password && touched.password ? (
                                <div style={{ color: "red" }}>{errors.password}</div>
                                ) : null 
                            } <br />
                            </div>
                        </Col>
                    </Row>
                    
                    <div className="text-center ">
                        <Link
                            to="/forgot-password" 
                            className="bg-light rounded-pill mx-4"
                            >Forgot Password ?
                        </Link>
                    </div>            
                        
                    <div className="text-center mx-auto p-4">
                        <p>Not a member ?  
                            <Link 
                                className="bg-light rounded-pill mx-4"
                                to="/sign-up"
                                onClick={()=>{
                                    dispatch({
                                        type: "SIGN_IN_TOGGLE",
                                        payload: !state.toggle
                                    })
                                }}
                            > Sign Up
                            </Link>
                        </p>
                    </div>

                    <div className="text-center">
                        <Button 
                            className="btn btn-light"
                            style={{backgroundColor: "white"}}
                            disabled={!values.password}
                            type="submit" 
                        >Sign In</Button>
                    </div>
                </form>    
            </Col>
        </Row>
    )
}

export default UserLogin