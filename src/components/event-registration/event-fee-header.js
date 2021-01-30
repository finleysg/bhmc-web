import React from "react"

function EventFeeHeader({ eventFees }) {
  return (
    <div className="slot" style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
      <div className="fees" style={{ alignItems: "flex-end" }}>
        {eventFees.map((eventFee) => {
          return (
            <div className="fee-head" key={eventFee.id}>
              {eventFee.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EventFeeHeader
