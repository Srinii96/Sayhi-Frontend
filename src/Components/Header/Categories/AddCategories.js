import { useRef, useState } from "react"
import { Row, Col } from "react-bootstrap"
import _ from "lodash/"
import { useSnackbar } from "notistack"
import axios from "../../../config/axios"
import "./style.css"

const AddCategories = ()=>{
    const { enqueueSnackbar } = useSnackbar()

    const categoryTitle  = useRef()
    const categoryPicture = useRef()

    const [formErrors, setFormErrors] = useState(null)
    const errors = {}

    const runValidations = ()=>{
        if(_.isEmpty(categoryTitle.current.value)){
            errors.title = "Category name is required"
        }else if(categoryTitle.current.value.trim().length < 2){
            errors.title = "Category name must be min 2 characters"
        }
        
        if (_.isEmpty(categoryPicture.current.files)) {
            errors.picture = "Please upload an PNG image"
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        runValidations()

        if(!_.isEmpty(errors)){
            setFormErrors(errors)
        }else{
            setFormErrors({})

            const formData = new FormData()
            formData.append("title", categoryTitle.current.value)
            formData.append("picture", categoryPicture.current.files[0])
            // send category to db
            axios.post("/api/category", formData, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
                .then((res)=>{
                    setFormErrors(null)
                    categoryTitle.current.value = ''
                    categoryPicture.current.value = ''
                    categoryPicture.current.files = null

                    enqueueSnackbar(`${res.data.title} added successfully.`, {
                        variant: 'success',
                        autoHideDuration: 2000, 
                    })
                })
                .catch((err)=>{
                    enqueueSnackbar(err.response.data.errors[0], {
                        variant: 'error',
                        autoHideDuration: 4000, 
                    })
                })
        }
    }
    
    return(
        <div className="d-flex justify-content-center align-items-center mb-4">
            <div className="form_category_custom_add mt-4">
                <h2>Add Categories</h2>

                <form onSubmit={handleSubmit}>
                    <Row className="justify-content-center mt-4">
                        <Col xs="auto">
                            <label htmlFor="categoryName">
                            <span>*</span>
                                Category Name </label> <br />
                            <input
                                className="mt-4 form_input_custom_category"
                                type="text"
                                placeholder="Category name"
                                id="categoryName"
                                ref={categoryTitle}
                                autoComplete="off"
                            />
                            <div>
                                {formErrors?.title && <span>{formErrors.title}</span>}
                            </div>
                        </Col>
                    </Row>
        
                    <Row className="justify-content-center mt-4">
                        <Col xs="auto">
                            <span className="custom-image">
                                <label htmlFor="uploadImage">
                                <span style={{color: "red"}}>*</span>
                                    Choose a photo</label>
                                <input
                                    className="upload_image"
                                    type="file"
                                    id="uploadImage"
                                    ref={categoryPicture}
                                />
                            </span>
                            <div>
                                {formErrors?.picture && <span>{formErrors.picture}</span>}
                            </div>
                        </Col>
                    </Row>
        
                    <Row className="justify-content-center">
                        <Col xs="auto">
                           <input
                                type="submit"
                                className="btn btn-primary mt-4"
                            />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    )
}

export default AddCategories