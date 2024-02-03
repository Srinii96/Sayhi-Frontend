import { useState, useEffect, memo } from "react"
import PropTypes from "prop-types"
import { Row, Col, Form, Button, Alert } from "react-bootstrap"
import { useSnackbar } from 'notistack'
import axios from "../../../../config/axios"
import { useDispatch } from "react-redux"
import { updateUserProfile } from "../../../../redux/actions/user-actions"
import "./UpdateProfile.css"

const UpdatePassword = (props) => {
    const { _id, firstName, lastName, email, mobile} = props
    const { enqueueSnackbar } = useSnackbar()

    const reduxDispatch = useDispatch()

    const [ userFirstName, setUserFirstName ] = useState("")
    const [ userLastName, setUserLastName ] = useState("")
    const [ mobileNumber, setMobileNumber ] = useState("")
    const [ currentPassword, setCurrentPassword ] = useState("")
    const [ updatePassword, setUpdatePassword ] = useState("")

    const [ serverErrors, setServerErrors] = useState([])

    const countrycode = "+91"

    useEffect(() => {
        if(firstName){
            setUserFirstName(firstName || "")
        }
        if(lastName){
            setUserLastName(lastName || "")
        }
        if(mobile){
            setMobileNumber(mobile || "")
        }
    }, [firstName, lastName, mobile])

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const formData = {
            "firstName": userFirstName, 
            "lastName": userLastName, 
            mobileNumber: mobileNumber,
            currentPassword, 
            updatePassword
        }

        try {
            const response = await axios.put(`/api/update-profile/${_id}`, formData, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            reduxDispatch(updateUserProfile(response.data.mobileNumber))
            enqueueSnackbar( response.data.msg, {
                variant: 'success',
                autoHideDuration: 3000, 
            })
            setCurrentPassword("")
            setUpdatePassword("")
            setServerErrors([])
        }catch(err){
            enqueueSnackbar( `Error updating profile: ${err.response.data.error}` || err.message, {
                variant: 'error',
                autoHideDuration: 3000, 
            })
            Array.isArray(err.response.data.error) && setServerErrors(err.response.data.error)
        }
        
    }
    return (
        <>
            <div className="error_container_custom">
                {serverErrors?.length > 0 && (
                <Alert variant="danger">
                    <ul>
                        {serverErrors.map(ele => <li key={ele.value}>{ele.msg}</li>)}
                    </ul>
                </Alert>
                )}
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="m-4">
                    <Col md={3}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={userFirstName} 
                                onChange={(e) => setUserFirstName(e.target.value)}
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={userLastName} 
                                onChange={(e) => setUserLastName(e.target.value)}
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                defaultValue={email}
                                disabled 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="m-4">
                    <Col md={4}>
                        <Form.Group controlId="mobileNumber">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={`${countrycode} ${mobileNumber}`}
                                    onChange={e => setMobileNumber(e.target.value.replace(/\D/g, "").slice(2, 12))}
                                    required
                                />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="m-4">
                    <Col md={4}>
                        <Form.Group controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control 
                                autoComplete="off"
                                type="password" 
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="updatePassword">
                            <Form.Label>Update Password</Form.Label>
                            <Form.Control 
                                autoComplete="off"
                                type="password" 
                                value={updatePassword}
                                onChange={e => setUpdatePassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="m-4">
                    <Col md={12} className="text-center">
                        <Button variant="primary" type="submit">Confirm</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default memo(UpdatePassword)

UpdatePassword.propTypes  = {
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string
}