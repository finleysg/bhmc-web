import React from "react"

import { PointsAdmin } from "components/admin/points-admin"
import PointsList from "components/admin/points-list"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useEventDocuments } from "hooks/document-hooks"

function AdminSlpPage() {
  const { clubEvent } = useEventAdmin()
  const documents = useEventDocuments(clubEvent?.id)

  const dataDocuments = documents?.filter((doc) => doc.documentType === "Z")

  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <OverlaySpinner loading={!clubEvent?.id} />
        <PointsAdmin
          clubEvent={clubEvent}
          documents={dataDocuments}
          title="Manage Season Long Points"
          noResultMessage="No points have been uploaded for this event"
        />
      </div>
      <div className="col-md-6 col-lg-6 col-xl-6">
        <PointsList clubEvent={clubEvent} />
      </div>
    </>
  )
}

export default AdminSlpPage
