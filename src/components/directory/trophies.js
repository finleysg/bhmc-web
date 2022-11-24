import { useState } from "react"

import { take } from "lodash"
import Modal from "react-bootstrap/Modal"

const limit = 5

function HasMore({ championships }) {
  const [show, setShow] = useState(false)

  const close = () => setShow(false)

  if (championships?.length > limit) {
    return (
      <>
        <h6>
          <button className="btn btn-link" onClick={() => setShow(true)}>
            More...
          </button>
        </h6>
        <Modal
          show={show}
          onHide={close}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>First-place Finishes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {championships.map((c) => (
              <h6 key={c.id} className="text-indigo" style={{ marginBottom: ".8rem" }}>
                <strong>{c.season}</strong> {c.event_name} ({c.flight})
              </h6>
            ))}
          </Modal.Body>
        </Modal>
      </>
    )
  }
  return null
}

export default function Trophies({ championships }) {
  const mostRecent = () => {
    return take(championships, limit)
  }

  return (
    <div>
      {mostRecent().map((c) => (
        <h6 key={c.id} className="text-indigo" style={{ marginBottom: ".8rem" }}>
          🏆 {c.season} {c.event_name}
        </h6>
      ))}
      <HasMore championships={championships} />
    </div>
  )
}
