import React from "react"

import { ScoresAdmin } from "components/admin/scores-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useEventDocuments } from "hooks/document-hooks"
import { useParams } from "react-router-dom"

function AdminScoresPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()
  const documents = useEventDocuments(clubEvent?.id)

  React.useEffect(() => {
    if (!Boolean(clubEvent?.id)) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  const dataDocuments = documents?.filter((doc) => doc.documentType === "Z")

  return (
    <div className="row">
      <OverlaySpinner loading={!Boolean(clubEvent?.id)} />
      <div className="col-md-6 col-lg-4 col-xl-3">
        <ScoresAdmin
          clubEvent={clubEvent}
          documents={dataDocuments}
          title="Import Hole by Hole Scores"
          noResultMessage="No scores have been uploaded for this event"
        />
      </div>
    </div>
  )
}

export default AdminScoresPage
