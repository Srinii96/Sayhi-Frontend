import { useState, memo} from 'react'
import PropTypes from "prop-types"
import { Row, Modal, Button, Form } from 'react-bootstrap'
import { useDispatch } from "react-redux"
import './UpdateProfile.css'
import axios from "../../../../config/axios"
import { useSnackbar } from 'notistack'
import { updateUserProfilePic } from '../../../../redux/actions/user-actions'
import UpdatePassword from './UpdatePassword'

const UpdateProfile = (props) => {
  const { _id, firstName, lastName, email, mobileNumber, profilePicture } = props.profile

  const { enqueueSnackbar } = useSnackbar()

  const reduxDispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const defaultPicture = process.env.PUBLIC_URL + '/Images/logos/profile-pic.png'

  const handleImageChange = (e) => {
    // Handle image selection
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  const handleImageUpload = async () => {
    setShowModal(false)

    const formData = new FormData()
    formData.append('profilePicture', selectedImage)

    try {
      const response = await axios.put('/api/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token')
        },
      })

      reduxDispatch(updateUserProfilePic(response.data.profilePicture))
    } catch (err) {
      enqueueSnackbar( `Error uploading an image: ${err.message}`, {
        variant: 'error',
        autoHideDuration: 3000, 
    })
    }
  }

  return (
    <>
      <Row className='mt-4'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <img
          src={profilePicture?.url || defaultPicture}
          alt='profile-pic'
          className='profile_pic_custom'
          onClick={() => setShowModal(true)}
        />
        <Modal show={showModal} onHide={() => setShowModal(false)} size='md'>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex flex-column align-items-center'>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose an image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>
              <Button onClick={handleImageUpload} variant='primary'>
                Save
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      </Row>
      <Row>
        <UpdatePassword 
          _id={_id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          mobile={mobileNumber}
          />
      </Row>
    </>
  )
}

export default memo(UpdateProfile)

UpdateProfile.propTypes  = {
  _id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.number,
  profilePicture: PropTypes.object
}
