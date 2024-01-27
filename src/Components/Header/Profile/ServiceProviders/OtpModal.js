import React from "react"
import { Modal, Form, Button } from "react-bootstrap"
import "./OtpModal.css"

const OtpModal = ({ show, handleClose, otp, setOtp, handleOtpSubmit, orderId }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="otpInput" className="otp-input-container">

          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Form.Control
              key={index}
              type="text"
              maxLength="1"
              className="otp-input-box"
              value={otp[index - 1] || ""}
              onChange={(e) => {
                const updatedOtp = otp.split("")
                updatedOtp[index - 1] = e.target.value
                setOtp(updatedOtp.join(""))
              }}
            />
          ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={ () => handleOtpSubmit("end", orderId)}>
          Submit OTP
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default OtpModal;
