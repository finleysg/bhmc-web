import React from "react"

import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function UnfinishedPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!clubEvent?.id) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  return (
    <div className="content__inner">
      <div style={{ margin: "40px auto 0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "10rem" }}>🏗️</p>
        <h3>We're still working on this page...</h3>
      </div>
    </div>
  )
}

export { UnfinishedPage }
