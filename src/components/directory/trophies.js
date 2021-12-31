import Dialog from "@reach/dialog"

import { useState } from "react"

import { IconActionButton } from "components/button/buttons"
import { take } from "lodash"
import { RiCloseFill } from "react-icons/ri"
import * as colors from "styles/colors"

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
        {show && (
          <Dialog
            onDismiss={close}
            aria-label="All first-place finishes"
            style={{ maxWidth: "400px" }}
          >
            <div className="card" style={{ position: "relative", maxWidth: "360px" }}>
              <div className="card-header bg-indigo">
                <span style={{ color: colors.white, fontSize: "1.4rem", marginRight: "1rem" }}>
                  First-place Finishes
                </span>
              </div>
              <div className="card-body">
                {championships.map((c) => (
                  <h6 key={c.id} className="text-indigo" style={{ marginBottom: ".8rem" }}>
                    <strong>{c.season}</strong> {c.event_name} ({c.flight})
                  </h6>
                ))}
              </div>
              <div style={{ position: "absolute", top: "4px", right: "4px" }}>
                <IconActionButton onAction={close} label="close" color={colors.black}>
                  <RiCloseFill />
                </IconActionButton>
              </div>
            </div>
          </Dialog>
        )}
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
