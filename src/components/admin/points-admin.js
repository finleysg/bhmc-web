import React from "react"

import { DataDocument } from "components/document/data-document"
import { FormGroup } from "components/field/forms"
import { OverlaySpinner } from "components/spinners"
import { Form, Formik } from "formik"
import { usePointsImport } from "hooks/admin-hooks"
import { CgImport } from "react-icons/cg"
import * as Yup from "yup"

function PointsImportForm({ document, onSubmit, onCancel }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">Import From {document.title}</h4>
        <Formik
          initialValues={{ info: "" }}
          validationSchema={Yup.object({
            info: Yup.string().max(30).required("Provide a course name or flight"),
          })}
          onSubmit={(values) => onSubmit({ document, info: values.info })}
        >
          <Form>
            <FormGroup name="info" type="text" label="Course / Flight" />
            <button
              className="btn btn-light"
              type="button"
              style={{ marginLeft: ".5rem" }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button className="btn btn-success" type="submit" style={{ marginLeft: ".5rem" }}>
              Import
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

function PointsAdmin({ clubEvent, documents, title, noResultMessage }) {
  const [isImporting, setIsImporting] = React.useState(false)
  const [selectedDocument, setSelectedDocument] = React.useState()
  const { mutate: importPoints, isLoading } = usePointsImport()
  const hasDocuments = Boolean(documents) && documents.length > 0

  const showImport = (document) => {
    setSelectedDocument(document)
    setIsImporting(true)
  }

  const handleImport = ({ document, info }) => {
    importPoints({
      eventId: clubEvent.id,
      documentId: document.id,
      info: info,
    })
    setIsImporting(false)
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-primary">{title}</h4>
          <OverlaySpinner loading={isLoading} />
          <React.Fragment>
            {hasDocuments || <p>{noResultMessage}</p>}
            {hasDocuments &&
              documents.map((doc) => (
                <DataDocument
                  document={doc}
                  onAction={showImport}
                  onSelect={showImport}
                  icon={<CgImport />}
                  selectLabel="Load points"
                  actionLabel="Import season long points"
                />
              ))}
          </React.Fragment>
        </div>
      </div>
      {isImporting && (
        <PointsImportForm
          document={selectedDocument}
          onSubmit={handleImport}
          onCancel={() => setIsImporting(false)}
        />
      )}
    </div>
  )
}

export { PointsAdmin }
