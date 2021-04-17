import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventDocumentUpload } from "hooks/document-hooks"
import { documentTypeMap } from "models/document"
import { toast } from "react-toastify"
import * as config from "utils/app-config"

import DocumentForm from "./document-form"

function DocumentUpload(props) {
  const { onComplete, onCancel, documentType, clubEvent } = props
  const { mutate: saveDocument, isLoading, isError, error } = useEventDocumentUpload()
  const [title, setTitle] = React.useState("")

  React.useEffect(() => {
    const documentTypeName = documentTypeMap.get(documentType).replace("Event ", "")
    if (Boolean(clubEvent?.id)) {
      setTitle(`${clubEvent.name} ${documentTypeName}`)
    } else {
      setTitle(documentTypeName)
    }
  }, [documentType, clubEvent])

  const normalizeFilename = (filename) => {
    const name = filename
      .toLowerCase()
      .trim()
      .replace("/", " ")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
    if (clubEvent?.id) {
      return `${clubEvent.slugDate}-${clubEvent.slugName}-${name}`
    }
    return name
  }

  const handleUpload = (values, file) => {
    const form = new FormData()
    form.append("document_type", values.documentType)
    form.append("event", clubEvent?.id)
    form.append("year", config.currentSeason)
    form.append("title", values.title)
    form.append("file", file, normalizeFilename(file.name))

    saveDocument(form, {
      onSuccess: () => {
        toast.success("📄 Your document has been uploaded.")
        onComplete()
      },
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <OverlaySpinner loading={isLoading} />
        <h4 className="card-title text-primary">Upload Document</h4>
        <DocumentForm
          onSubmit={handleUpload}
          onCancel={onCancel}
          title={title}
          documentType={documentType}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export { DocumentUpload }
