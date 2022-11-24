import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function StandardConfirmDialog({ show, onConfirm, onCancel, message }) {
  return (
    <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="light" onClick={onCancel}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { StandardConfirmDialog }
