import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useStaticDocumentCreate, useStaticDocumentUpdate } from "hooks/document-hooks"
import { toast } from "react-toastify"
import * as config from "utils/app-config"

import DocumentForm from "./document-form"

function StaticDocumentUpload(props) {
  const { onComplete, documentType, document, code } = props
  const { mutate: create, status: createStatus, error: createError } = useStaticDocumentCreate()
  const { mutate: update, status: updateStatus, error: updateError } = useStaticDocumentUpdate()

  const handleUpload = (values, file) => {
    const form = new FormData()
    form.append("document_type", values.documentType)
    form.append("year", config.currentSeason)
    form.append("title", values.title)
    form.append("file", file, file.name)

    if (document?.id) {
      update(
        { documentId: document.id, formData: form },
        {
          onSuccess: () => {
            toast.success("📄 Your document has been updated.")
            onComplete()
          },
        },
      )
    } else {
      create(
        { code: code, formData: form },
        {
          onSuccess: () => {
            toast.success("📄 Your document has been created.")
            onComplete()
          },
        },
      )
    }
  }

  return (
    <div className="card">
      <OverlaySpinner loading={createStatus === "loading" ?? updateStatus === "loading"} />
      <h4 className="card-title text-primary">Upload Document</h4>
      <DocumentForm
        onSubmit={handleUpload}
        onCancel={onComplete}
        title={document?.title}
        documentType={documentType}
        isError={createStatus === "error" ?? updateStatus === "error"}
        isLoading={createStatus === "loading" ?? updateStatus === "loading"}
        error={createError ?? updateError}
      />
    </div>
  )
}

export { StaticDocumentUpload }
