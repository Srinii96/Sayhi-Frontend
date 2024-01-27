import { useFormik } from "formik"
import * as Yup from "yup"
import { Form, Button, Row, Col } from 'reactstrap'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../../config/axios"

const ResetPassword = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            "password": "",
            "confirmPassword": ""
        },
        
        validationSchema: Yup.object({

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

        onSubmit: async (values)=>{
            try{
                await axios.post(`/api/reset-password/${token}`, values)

                toast.success("Reset password success!", {
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
                }, 2000)
                
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

  return (
    <Row>
            <div className="text-center">
                <h3>Reset Password</h3>
            </div>
        <Col className="justify-content-center my-4"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Images/user-sign-up/reset-password.png)`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '100%',
            height: '50vh',
            }}
        >
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Row className="row justify-content-center">
                    <Col className="col-2">
                        <label 
                            className="form-label" 
                            htmlFor="password"
                            >New Password</label>
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
                        />
                        <div className="text-center">
                            { errors.password && touched.password ? (
                                <div style={{ color: "red" }}>{errors.password}</div>
                                ) : null } <br />
                        </div>
                    </Col>

                    <Col className="col-2">
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

                <div className="text-center">
                    <Button
                        type="submit"
                        className="btn btn-light bg-info"
                        disabled={errors.confirmPassword}
                        >Submit</Button>
                </div>
            </Form>
        </Col>
    </Row>
  )
}

export default ResetPassword