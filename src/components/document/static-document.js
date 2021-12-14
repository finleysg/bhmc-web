import styled from "@emotion/styled/macro"

import React from "react"

import { AdminAction2 } from "components/button/admin-buttons"
import { DocumentCard } from "components/document/document-card"
import { OverlaySpinner } from "components/spinners"
import { useStaticDocument } from "hooks/document-hooks"
import { RiEdit2Line, RiFileUploadFill } from "react-icons/ri"
import * as colors from "styles/colors"

import { StaticDocumentUpload } from "./static-document-upload"

const DocumentContainer = styled.div({
  position: "relative",
  padding: 0,
  margin: 0,
  minWidth: "240px",
  maxWidth: "420px",
})

function StaticDocument({ code, documentType }) {
  const [showUpload, setShowUpload] = React.useState(false)
  const { data: document, status } = useStaticDocument(code)
  const documentExists = Boolean(document?.id)

  return (
    <div style={{ backgroundColor: colors.base }}>
      <OverlaySpinner loading={status === "loading"} />
      {documentExists && (
        <DocumentContainer>
          <AdminAction2
            color={colors.indigo}
            label="Update this document"
            id={document.id}
            onAction={() => setShowUpload(true)}
          >
            <RiEdit2Line />
          </AdminAction2>
          <DocumentCard document={document} />
        </DocumentContainer>
      )}
      {documentExists || (
        <div style={{ position: "relative" }}>
          <AdminAction2 color={colors.indigo} label="Upload a document" id={0} onAction={() => setShowUpload(true)}>
            <RiFileUploadFill />
          </AdminAction2>
        </div>
      )}
      {showUpload && (
        <StaticDocumentUpload
          code={code}
          document={document}
          documentType={documentType}
          onComplete={() => setShowUpload(false)}
        />
      )}
    </div>
  )
}

export { StaticDocument }
