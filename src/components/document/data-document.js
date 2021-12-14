import styled from "@emotion/styled/macro"

import React from "react"

import { IconActionButton } from "components/button/buttons"
import { format } from "date-fns"
import { FiFileText } from "react-icons/fi"
import * as colors from "styles/colors"

const DataDocumentDetail = styled.div({
  display: "flex",
  justifyContent: "space-between",
  margin: "1rem 0",
  minWidth: "240px",
  maxWidth: "420px",
  overflow: "hidden",
})

function DataDocument({ document, selectLabel, actionLabel, icon, onSelect, onAction, ...rest }) {
  const [updated, setUpdated] = React.useState()

  React.useEffect(() => {
    if (Boolean(document) && Boolean(document.lastUpdate)) {
      const updateString = format(document.lastUpdate, "MMMM d, yyyy h:mm aaaa")
      setUpdated(updateString)
    }
  }, [document])

  return (
    <DataDocumentDetail {...rest}>
      <div className="text-muted" style={{ marginRight: "1rem" }}>
        <IconActionButton color={colors.indigo} label={selectLabel} onAction={() => onSelect(document)}>
          <FiFileText style={{ fontSize: "1.5rem" }} />
        </IconActionButton>
      </div>
      <div style={{ overflow: "hidden" }}>{document.title}</div>
      {updated && (
        <div>
          <small className="text-muted">({updated})</small>
        </div>
      )}
      <div>
        <IconActionButton color={colors.indigo} label={actionLabel} onAction={() => onAction(document)}>
          {icon}
        </IconActionButton>
      </div>
    </DataDocumentDetail>
  )
}

export { DataDocument }
