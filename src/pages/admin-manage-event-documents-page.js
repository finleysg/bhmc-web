import React from "react"

import { DocumentAdmin } from "components/admin/document-admin"
import { DocumentUpload } from "components/document/document-upload"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useEventDocuments } from "hooks/document-hooks"

function AdminManageEventDocumentsPage() {
  const { clubEvent } = useEventAdmin()
  const documents = useEventDocuments(clubEvent?.id)
  const [showAdd, setShowAdd] = React.useState(false)
  const [documentType, setdocumentType] = React.useState("O")

  const handleAddDocument = (docType) => {
    setdocumentType(docType)
    setShowAdd(true)
  }

  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <OverlaySpinner loading={!clubEvent?.id} />
        <DocumentAdmin
          documents={documents}
          title="Manage Event Documents"
          noResultMessage="No documents have been uploaded for this event"
          onAddNew={handleAddDocument}
        />
      </div>
      <div className="col-md-6 col-lg-4 col-xl-3">
        {showAdd && (
          <DocumentUpload
            clubEvent={clubEvent}
            documentType={documentType}
            onComplete={() => setShowAdd(false)}
            onCancel={() => setShowAdd(false)}
          />
        )}
      </div>
    </>
  )
}

export default AdminManageEventDocumentsPage
