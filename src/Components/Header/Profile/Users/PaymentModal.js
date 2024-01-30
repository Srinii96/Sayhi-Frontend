import { useEffect, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"

const AmountModal = ({ money, show, handleClose, handlePaymentSubmit }) => {
  const [amount, setAmount] = useState("")

  useEffect(()=>{
    setAmount(money)
  }, [money])

  const handleSubmit = () => {
    handlePaymentSubmit(amount)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Amount</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="amountInput">
          <Form.Control
            type="text"
            placeholder="Enter Amount"
            value={amount}
            disabled
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AmountModal
