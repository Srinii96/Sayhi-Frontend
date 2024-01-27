import { useFormik } from "formik"
import * as Yup from "yup"
import { Button, Row, Col } from 'reactstrap'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../../config/axios"

const ForgotPassword = () => {
    const navigate = useNavigate()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
        email: ""
        },
        validationSchema: Yup.object({
        email: Yup.string()
            .trim()
            .strict(true)
            .email("Not a valid e-mail address")
            .test('is-lowercase', 'Email must be lowercase', value => value === value.toLowerCase())
            .required("Email is required"),
        }),
        onSubmit: async (values) => {
            console.log(values)
        try {
            await axios.post("/api/forgot-password", values)
            toast.success("reset password link sent to your email!", {
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

        } catch (err) {
            toast.error( err.response.data.error, {
                position: "top-right",
                autoClose: 5000,
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
        <Row
            className="justify-content-center my-4" 
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Images/user-sign-up/email.png)`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            width: '100%',
            height: '70vh',
            }}>
            <Col>
                <div className="text-center">
                    <h3>Enter registered email</h3>
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <Row className="justify-content-center">
                        <Col className="col-2">
                        <label
                            className="form-label"
                            htmlFor="email"
                        ></label>
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
                            {errors.email && touched.email ? (
                            <div style={{ color: "red" }}>{errors.email}</div>
                            ) : null
                            } <br />
                        </div>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button
                        type="submit"
                        className="btn btn-light bg-info"
                        >Submit</Button>
                    </div>
                </form>
                
            </Col>
        </Row>
    )
}

export default ForgotPassword;
