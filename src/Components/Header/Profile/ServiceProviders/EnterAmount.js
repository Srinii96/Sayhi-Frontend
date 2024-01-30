import { Row, Button, Modal, Form } from "react-bootstrap"
import { useState } from "react"

const EnterAmount = ({ show, handleClose, handleAmountSubmit }) => {
    const [amount, setAmount] = useState("")

    const handleSubmit = () => {
        handleAmountSubmit(amount)
        handleClose()
    }

  return (
    <Row>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>
                </Form>
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
    </Row>
  )
}

export default EnterAmount