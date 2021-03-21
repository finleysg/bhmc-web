import styled from "@emotion/styled/macro"

import React from "react"

import { format } from "date-fns"
import { FiFileText } from "react-icons/fi"
import * as colors from "styles/colors"

const DocumentDetail = styled.div({
  border: `1px solid ${colors.gray300}`,
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  margin: "1rem 0",
  minWidth: "240px",
  maxWidth: "420px",
  overflow: "hidden",
})

const DocumentTitle = styled.p({
  marginBottom: ".3rem",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const DocumentDate = styled.p({
  marginBottom: 0,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
})

const cardColor = (documentType) => {
  switch (documentType) {
    case "R":
      return "text-indigo"
    case "T":
      return "text-teal"
    case "F":
      return "text-green"
    case "P":
    case "D":
      return "text-light-blue"
    default:
      return "text-blue-gray"
  }
}

function DocumentCard({ document, ...rest }) {
  const [updated, setUpdated] = React.useState()

  React.useEffect(() => {
    if (Boolean(document) && Boolean(document.lastUpdate)) {
      try {
        const updateString = format(document.lastUpdate, "MMMM d, yyyy h:mm aaaa")
        setUpdated(updateString)
      } catch (error) {
        console.error(error)
      }
    }
  }, [document])

  return (
    <a href={document.file} target="_blank" rel="noreferrer" alt={document.title}>
      <DocumentDetail {...rest}>
        <div className={cardColor(document.documentType)} style={{ marginRight: "1rem" }}>
          <FiFileText style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ overflow: "hidden" }}>
          <DocumentTitle className={cardColor(document.documentType)} title={document.title}>
            {document.title}
          </DocumentTitle>
          {updated && (
            <DocumentDate title={updated}>
              <small className="text-muted">Updated: {updated}</small>
            </DocumentDate>
          )}
        </div>
      </DocumentDetail>
    </a>
  )
}

export { DocumentCard }
