import { useState, memo, useEffect } from "react"
import PropTypes from "prop-types"
import { Row, Col, Form, Button, Alert } from "react-bootstrap"
import _ from "lodash"
import { useSnackbar } from 'notistack'
import { useDispatch } from "react-redux"
import axios from "../../../../config/axios"
import { addUserAddress, updateUserAddress } from "../../../../redux/actions/user-actions"
import "./Address.css"

const AddressForm = (props) => {
  const { _id, doorNo: door, buildingName: house, locality: area, landmark: place, city: metropolis, state: nation, pinCode: zipCode } = props.userAddress

  const { enqueueSnackbar } = useSnackbar()
  const reduxDispatch = useDispatch ()

  const [ doorNo, setDoorNo ] = useState("")
  const [ buildingName, setBuildingName ] = useState("")
  const [ locality, setLocality ] = useState("")
  const [ landmark, setLandmark ] = useState("")
  const [ city, setCity ] = useState("")
  const [ state, setState ] = useState("")
  const [ pinCode, setPinCode ] = useState("")
  const [ formErrors, setFormErrors ] = useState({})
  const errors = {}

  const [ serverErrors, setServerErrors ] = useState([])
  const country = "India"

  useEffect(() => { 
    if(door){
      setDoorNo(door || "")
    }
    if(house){
      setBuildingName(house || "")
    }
    if(area){
      setLocality(area || "")
    }
    if(place){
      setLandmark(place || "")
    }
    if(metropolis){
      setCity(metropolis || "")
    }
    if(nation){
      setState(nation || "")
    }
    if(zipCode){
      setPinCode(zipCode + "" || "")
    }
  }, [door, house, area, place, metropolis, nation, zipCode])
    

  const handleChange = (e)=>{
    const {name, value} = e.target
    if(name === "doorNo"){
      setDoorNo(value)
    }
    if(name === "buildingName"){
      setBuildingName(value)
    }
    if(name === "locality"){
      setLocality(value)
    }
    if(name === "landmark"){
      setLandmark(value)
    }
    if(name === "city"){
      setCity(value)
    }
    if(name === "state"){
      setState(value)
    }
    if(name === "pinCode"){
      setPinCode(value)
    }
  }

  const runValidators = ()=>{
    if(doorNo.trim().length === 0){
      errors.doorNo = 'Door no cannot be blank'
    }

    if(buildingName.trim().length === 0){
      errors.buildingName = 'Building name cannot be blank'
    }

    if(locality.trim().length === 0){
      errors.locality = 'Locality cannot be blank'
    }

    if(landmark.trim().length === 0){
      errors.Landmark = 'Landmark cannot be blank'
    }

    if(city.trim().length === 0){
      errors.city = 'City cannot be blank'
    }

    if(state.trim().length === 0){
      errors.state = 'State cannot be blank'
    }

    if(pinCode.trim().length === 0){
      errors.pinCode = 'Pin Code must required'
    }
  }

  const resetForm = ()=>{
    setDoorNo("")
    setBuildingName("")
    setLocality("")
    setLandmark("")
    setCity("")
    setState("")
    setPinCode("")
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    runValidators()

    if(!_.isEmpty(errors)){
      setFormErrors(errors)
    }else{
      try{
        const formData = {doorNo, buildingName, locality, landmark, city, state, pinCode: Number(pinCode)}
        const response = await axios.post("/api/user-address", formData, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        enqueueSnackbar( "Address saved successfully !", {
          variant: 'success',
          autoHideDuration: 3000, 
        })
        reduxDispatch(addUserAddress(response.data))
        resetForm()
        setFormErrors({})
        setServerErrors([])
      }catch(err){
        setServerErrors(err.response.data.errors)
        enqueueSnackbar( `Error saving address: ${err.message}`, {
          variant: 'error',
          autoHideDuration: 3000, 
        })
      }
    }
  }

  const handleUpdate = async (e)=>{
    e.preventDefault()
    runValidators()

    if(!_.isEmpty(errors)){
      setFormErrors(errors)
    }else{
      try{
        const formData = {doorNo, buildingName, locality, landmark, city, state, pinCode: Number(pinCode)}
        const response = await axios.put(`/api/user-address/${_id}`, formData, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        enqueueSnackbar( "Address updated successfully !", {
          variant: 'success',
          autoHideDuration: 3000, 
        })
        reduxDispatch(updateUserAddress(response.data))
        resetForm()
        setFormErrors({})
        setServerErrors([])
      }catch(err){
        setServerErrors(err.response.data.errors)
        enqueueSnackbar( `Error updating address: ${err.message}`, {
          variant: 'error',
          autoHideDuration: 3000, 
        })
      }
    }
  }

  return (
    <>
      <div className="error_container_custom">
        {serverErrors.length > 0 && (
          <Alert variant="danger">
            <ul>
              {serverErrors.map(ele => <li key={ele.value}>{ele.msg}</li>)}
            </ul>
          </Alert>
        )}
      </div>

      <Form onSubmit={ _id ? (handleUpdate) : (handleSubmit) } autoComplete="off">
        <Row className="m-4">
          <Col md={4}>
            <label 
              htmlFor="doorNo"
            >Door No</label> <br />

            <input 
              type="text"
              name="doorNo"
              id="doorNo"
              value={doorNo}
              onChange={handleChange}
              className="form_input_custom_doorNo" 
            /><br/>
            {formErrors && <span className="form_err_custom">{formErrors.doorNo}</span>} <br />
          </Col>

          <Col>
            <label 
              htmlFor="buildingName"
            >Building/Apartment Name</label> <br />

            <input 
              type="text"
              name="buildingName"
              id="buildingName"
              value={buildingName}
              onChange={handleChange}
              className="form_input_custom_buildingName"  
            /><br/>
            {formErrors && <span className="form_err_custom">{formErrors.buildingName}</span>} <br />
          </Col>
        </Row>

        <Row className="m-4">
          <Col md={4}>
            <label 
              htmlFor="locality"
            >Locality</label> <br />

            <input 
              type="text"
              name="locality"
              id="locality"
              value={locality}
              onChange={handleChange}
              className="form_input_custom_locality" 
            />
            <br/>
            {formErrors && <span className="form_err_custom">{formErrors.locality}</span>} <br />
          </Col>

          <Col>
            <label 
              htmlFor="landmark"
            >Landmark</label> <br />

            <input 
              type="text"
              name="landmark"
              id="landmark"
              value={landmark}
              onChange={handleChange}
              className="form_input_custom_landmark" 
            />
            <br/>
            {formErrors && <span className="form_err_custom">{formErrors.landmark}</span>} <br />
          </Col>

          <Col>
            <label 
              htmlFor="city"
            >City</label> <br />

            <input 
              autoComplete="off"
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
              className="form_input_custom_city" 
            /><br/>
            {formErrors && <span className="form_err_custom">{formErrors.city}</span>} <br />
          </Col>
        </Row>

        <Row className="m-4">
          <Col md={4}>
            <label 
              htmlFor="state"
            >State</label> <br />

            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={handleChange}
              className="form_input_custom_state" 
            /><br/>
            {formErrors && <span className="form_err_custom">{formErrors.state}</span>} <br />
          </Col>

          <Col>
            <label 
              htmlFor="pinCode"
            >Postal Code</label> <br />

            <input 
              type="text"
              name="pinCode"
              id="pinCode"
              value={pinCode}
              onChange={handleChange}
              className="form_input_custom_pinCode" 
            /><br/>
            {formErrors && <span className="form_err_custom">{formErrors.pinCode}</span>} <br />
          </Col>

          <Col>
            <label 
              htmlFor="country"
            >Country</label> <br />

            <input 
              type="text"
              name="country"
              id="country"
              defaultValue={country}
              className="form_input_custom_country" 
              disabled
            />
          </Col>
        </Row>

        <Row className="m-4">
          <Col md={12} className="d-flex justify-content-center"> 
            {_id ? (
              <Button
              variant="primary" 
              type="submit"
            >Update</Button>
            ) : (
              <Button
              variant="primary" 
              type="submit"
            >Save</Button>
            )}
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default memo(AddressForm)

AddressForm.propTypes = {
  _id: PropTypes.string,
  doorNo: PropTypes.string, 
  buildingName: PropTypes.string,
  locality: PropTypes.string,
  landmark: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,             
}
