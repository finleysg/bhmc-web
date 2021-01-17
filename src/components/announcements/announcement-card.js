import React from "react"

import { DocumentButton } from "components/registration"
import { useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function AnnouncementCard(props) {
  const { announcement } = props
  const isMember = useRegistrationStatus(config.seasonEventId)

  const show = (visibility) => {
    if (visibility === "A") {
      return true
    } else if (visibility === "M") {
      return isMember
    } else {
      return !isMember
    }
  }

  if (show(announcement.visibility)) {
    return (
      <div style={{ marginBottom: "2rem" }}>
        <h4 className="text-primary">{announcement.title}</h4>
        <ReactMarkdown source={announcement.text} plugins={[gfm]} escapeHtml={true} />
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {announcement.documents &&
            announcement.documents.map((doc) => {
              return <DocumentButton document={doc} />
            })}
        </div>
      </div>
    )
  }
  return null
}

export default AnnouncementCard
