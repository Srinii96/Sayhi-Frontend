import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Row, Col, Form, Button, Alert } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify"
import { useSnackbar } from 'notistack'
import CreatableSelect from "react-select/creatable"
import 'react-select'
import _ from "lodash"
import reducerContext from "../../../contextApi's/contextAPI"
import axios from "../../../config/axios"


const RegisterAsPartner = ()=>{

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const { state } = useContext(reducerContext)

    const [serviceNames, setServiceNames] = useState([])
    const [locationNames, setLocationNames] = useState([])
    const [serverErrors, setServerErrors] = useState([])


    const { values, errors, touched, getFieldProps, setFieldValue, handleChange, handleBlur, handleSubmit } 
    = useFormik({
        initialValues: {
            serviceProviderName: "",
            description: "",
            categoryId: "",
            serviceIds: [],
            role: "",
            serviceType: [],
            authorisedDealer: null,
            places: [],
            locations: []
        },

        validationSchema: Yup.object({
            "serviceProviderName": Yup.string().trim("Service name cannot include leading and trailing spaces")
            .strict(true)
            .min(3, "Service name should be min 3 characters")
            .matches(/^[A-Z a-z]+$/, 'Service name should contain only alphabetic characters')
            .required("Service name is required"),

            "description": Yup.string().trim("Description cannot include leading and trailing spaces")
            .strict(true)
            .min(5, "Description should be min 5 characters")
            .matches(/^[A-Z a-z 0-9 , . ' /]+$/, 'Description should contains only alphabetics, Numerics, camas, & periods')
            .required("Description is required"),

            "categoryId": Yup.string().required("Category is required"),

            "serviceIds": Yup.array().min(1, 'Select/Create at least one option').required('Service is required'),

            "role": Yup.string().required("Role is required"),

            "serviceType": Yup.array().min(1, 'Select at least one option').required('Service type is required'),

            "authorisedDealer": Yup.mixed().required('JPEG image is required'),

            "places": Yup.array().min(1, 'Enter at least one area name').required('Service providing areas is required')
        }),

        onSubmit: async (values, { resetForm })=>{
            const formObj = _.omit(values, ["places"])
            const formValues = {
                ...formObj, 
                serviceIds: values.serviceIds.map(option => option.value),
                serviceType: values.serviceType.map(option => option.value)
            }

            const formData = new FormData();
            formData.append("serviceProviderName", formValues.serviceProviderName);
            formData.append("description", formValues.description);
            formData.append("categoryId", formValues.categoryId);
            formData.append("role", formValues.role);
            formData.append("authorisedDealer", formValues.authorisedDealer);

            // Append serviceIds array values
            formValues.serviceIds.forEach((id, index) => {
                formData.append(`serviceIds[${index}]`, id)
            })

            // Append serviceType array values
            formValues.serviceType.forEach((type, index) => {
                formData.append(`serviceType[${index}]`, type)
            })

            formValues.locations.forEach((location, index) => {
                formData.append(`locations[${index}][type]`, 'Point')
                formData.append(`locations[${index}][coordinates][0]`, location.longitude)
                formData.append(`locations[${index}][coordinates][1]`, location.latitude)
            })
            
            try {
                const response = await axios.post("/api/service-provider", formData, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })

                resetForm()
                toast.success(`${response.data.serviceProviderName} registered successfully!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setTimeout(()=>{
                    navigate("/")
                }, 2000)

            } catch(err){
                setServerErrors(err.response.data.errors)
            }
        }
    })

    useEffect(() => {
        const selectContainers = document.querySelectorAll('.react-select-container');
      
        const preventDefaultHandler = (e) => {
            e.preventDefault()
            e.stopPropagation()
        };
    
        selectContainers.forEach(container => {
            container.addEventListener('touchstart', preventDefaultHandler)
            container.addEventListener('touchmove', preventDefaultHandler)
        })
    
        return () => {
            selectContainers.forEach(container => {
                container.removeEventListener('touchstart', preventDefaultHandler)
                container.removeEventListener('touchmove', preventDefaultHandler)
            })
        }
    }, [])
    

    const serviceNamesFilter = (serviceProviders) => {
        const uniqueServiceNames = []
        
        serviceProviders.forEach((ele) => {
            const serviceNameObject = { id: ele._id, serviceName: ele.serviceName }
      
            const existingIndex = uniqueServiceNames.findIndex((obj) => obj.id === serviceNameObject.id)
      
            if (existingIndex === -1) {
              uniqueServiceNames.push(serviceNameObject)
            }
        })
    
        return uniqueServiceNames
    }

    useEffect(()=>{
        if(values.categoryId.length > 0){
            ( async ()=>{
                try {
                    const { data } = await axios.get(`/api/category/${values.categoryId}`, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                    const result = serviceNamesFilter(data.serviceIds)
                    setServiceNames(result)
                }catch(err){
                    enqueueSnackbar( err.response.data.error || err.message, {
                        variant: 'error',
                        autoHideDuration: 3000, 
                    })
                }
            }
            )()
        }
    }, [enqueueSnackbar, values.categoryId])
    
    const handleCreateServices = async (inputValue)=>{
        const serviceObj = {"serviceName": inputValue, "categoryId": values.categoryId}

        try {
            if(serviceObj.categoryId.length === 0){
                enqueueSnackbar('Please select required category before adding service', {
                    variant: 'warning',
                    autoHideDuration: 3000, 
                })
            }else{
                const { data } = await axios.post("/api/service", serviceObj, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })

                const {_id, serviceName} = data
                setServiceNames([...serviceNames, {"id":_id, serviceName}])
            }
        } catch(err){
            enqueueSnackbar(err.response.data.error  || err.response.data.errors[0].msg || err.message, {
                variant: 'error',
                autoHideDuration: 3000, 
            })
        }
    }

    const handleChangeArea = (newValue) => {
        const selectedArea =  newValue[newValue.length - 1]
        const filteredLocations = newValue.filter(label => label.value !== selectedArea.value)
        const finalLocations = [{...selectedArea}, ...filteredLocations]

        if(values.places.length >= 3){
            enqueueSnackbar("Not allowed more than 3 areas", {
                variant: 'info',
                autoHideDuration: 3000, 
            })
            setFieldValue("places", [])
        }else{
            setFieldValue("places", finalLocations)
            setLocationNames([])  
        }
        
        if(!finalLocations[0].label){
            setFieldValue("places", [])
        }
    }

    const handleCreateLocations = async (inputArea)=>{
        try {
            const {data} = await axios.get(`https://geocode.maps.co/search?q=${inputArea}&api_key=${process.env.REACT_APP_MY_VARIABLE}`)
            if(data.length === 1){
                const {lat, lon} = data[0]
                setFieldValue("locations", [...values.locations, {latitude:lat, longitude: lon}])
                enqueueSnackbar(`${inputArea} location added on the list`, {
                    variant: 'success',
                    autoHideDuration: 3000, 
                })
            }else if(data.length > 0){
                setLocationNames(prevState => {
                    const arr = data.map(ele => ({
                        place_id: ele.place_id,
                        latitude: ele.lat,
                        longitude: ele.lon,
                        display_name: ele.display_name
                    }));
                    return [...prevState, ...arr] // Update state by spreading previous state and adding new items
                })
            }
        } catch(err){
            enqueueSnackbar(err.message, {
                variant: 'error',
                autoHideDuration: 3000, 
            })
        }
    }

    useEffect(()=>{
        const arr = values.places
        if(arr.length > 0){
            (async ()=>{
                try {
                    const name = arr[0].label
                    const result = await axios.get(`https://geocode.maps.co/search?q=${name}&api_key=${process.env.REACT_APP_MY_VARIABLE}`)
                    const {lat, lon} = result.data[0]
                    setFieldValue("locations", [...values.locations, {latitude:lat, longitude: lon}])
                }catch(err){
                    enqueueSnackbar(err.message, {
                        variant: 'error',
                        autoHideDuration: 4000, 
                    })
                }
            })()
        }
        
    }, [enqueueSnackbar, values.places])

    useEffect(()=>{
        let timer
        if (serverErrors.length > 0) {
            timer = setTimeout(() => {
                setServerErrors([])
            }, 5000)
        }

        return () => clearTimeout(timer)
    }, [serverErrors])

    return(
        <>
            <ToastContainer />
            <div className="error-container">
            {serverErrors.length > 0 && (
                <Alert variant="danger" className="custom-alert-width">
                    <ul>
                        {serverErrors.map((ele, i)=>{
                            return (
                                <li key={i}>{ele.msg}</li>
                            )
                        })}
                    </ul>
                </Alert>
            )}
            </div>
            <Row className="mt-4">
                <Col className="text-center">
                    <h2>Register As a Partner</h2>
                </Col>
            </Row>
            <Row className="mt-4 mb-4 justify-content-center">
                <Col className="register_form_custom" xl={11}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} xl={3} controlId="serviceProviderName">
                                <Form.Label>Service Provider Name</Form.Label>
                                <Form.Control 
                                    placeholder="Jagadesh Ac Works" 
                                    name="serviceProviderName"
                                    type="text" 
                                    value={values.serviceProviderName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />

                                <div className="mt-1">
                                    { errors.serviceProviderName && touched.serviceProviderName ? (
                                    <span>{errors.serviceProviderName}</span>
                                    ): null } <br />
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} xl={7} controlId="description">
                                <Form.Label>description</Form.Label>
                                <Form.Control 
                                    placeholder="Mention about your work experience" 
                                    name="description"
                                    as="textarea"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                />

                                <div className="mt-1">
                                    { errors.description && touched.description ? (
                                    <span>{errors.description}</span>
                                    ): null } <br />
                                </div>
                            </Form.Group>    
                        </Row>

                        <Row >
                            <Form.Group as={Col} xl={2} controlId="categoryId">
                                <Form.Label>Categories</Form.Label>
                                <Form.Select
                                    {...getFieldProps("categoryId")}
                                    name="categoryId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select...</option>
                                    {state.categories &&
                                    _.sortBy(state.categories, "title").map((ele)=>{
                                        return <option
                                            key={ele._id}
                                            value={ele._id}
                                        >{ele.title}</option>
                                    })}
                                </Form.Select>
                                <div>
                                {touched.categoryId && errors.categoryId ? (
                                <span>{errors.categoryId}</span>
                                ) : null}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} xl={3}  controlId="serviceIds">
                                <Form.Label>Services</Form.Label>
                                <CreatableSelect
                                {...getFieldProps("serviceIds")}
                                isMulti
                                name="serviceIds"
                                onChange={(newValue, actionMeta) => setFieldValue("serviceIds", newValue)}
                                onCreateOption={handleCreateServices}
                                options={serviceNames?.map((ele) => ({
                                    value: ele.id,
                                    label: ele.serviceName,
                                }))}
                                onBlur={handleBlur}
                                />
                                <Form.Text style={{color:"black"}}>If service is not there just type and hit enter</Form.Text>
                                <div>
                                {touched.serviceIds && errors.serviceIds ? (
                                <span>{errors.serviceIds}</span>
                                ) : null}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} xl={2} controlId="role">
                                <Form.Label>Roles</Form.Label>
                                <Form.Select 
                                    name="role"
                                    value={values.role} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select...</option>
                                    <option value="technician">Technician</option>
                                    <option value="self employee">Self Employee</option>
                                </Form.Select>
                                <Form.Text style={{color:"black"}}>If you are a repair man select technician</Form.Text>
                                <div>
                                {touched.role && errors.role ? (
                                <span>{errors.role}</span>
                                ) : null}
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} xl={3}  controlId="places">
                                <Form.Label>Service Providing Areas</Form.Label>
                                <CreatableSelect
                                {...getFieldProps("places")}
                                isMulti
                                name="places"
                                onChange={handleChangeArea}
                                onCreateOption={handleCreateLocations}
                                options={locationNames.map((ele, i)=>({
                                    value: ele.place_id,
                                    label: ele.display_name,
                                    latitude: ele.latitude,
                                    longitude: ele.longitude
                                }))}
                                onBlur={handleBlur}
                                />
                                <Form.Text style={{color:"black"}}>Type services providing area, hit enter & select areas</Form.Text>
                                <div>
                                {touched.places && errors.places ? (
                                <span>{errors.places}</span>
                                ) : null}
                                </div>
                            </Form.Group>
                        </Row>

                        <Row className="mt-4">
                            <Form.Group as={Col} xl={2} controlId="serviceType">
                                <Form.Label>Service Type</Form.Label>
                                <CreatableSelect

                                isMulti
                                name="serviceType"
                                onChange={(newValue, actionMeta) => setFieldValue("serviceType", newValue)}
                                options={[
                                    { value: 'home', label: 'Home' },
                                    { value: 'business', label: 'Business' },
                                    { value: 'corporate', label: 'Corporate' }
                                ]}
                                onBlur={handleBlur}
                                />
                                <div>
                                {touched.serviceType && errors.serviceType ? (
                                <span>{errors.serviceType}</span>
                                ) : null}
                                </div>
                            </Form.Group>
                            
                            <Form.Group as={Col} xl={3} controlId="authorisedDealer">
                                <Form.Label>Choose a photo</Form.Label>
                                <Form.Control
                                    name="authorisedDealer" 
                                    type="file"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("authorisedDealer", file);
                                    }}
                                    onBlur={handleBlur}
                                />
                                <Form.Text style={{color:"black"}}>Upload service authorised JPEG image format only</Form.Text>
                                <div>
                                {touched.authorisedDealer && errors.authorisedDealer ? (
                                <span>{errors.authorisedDealer}</span>
                                ) : null}
                                </div>
                            </Form.Group>
                        </Row>
                        
                        <Row className="mt-4">
                            <Col>
                                <Button type="submit" >submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default RegisterAsPartner