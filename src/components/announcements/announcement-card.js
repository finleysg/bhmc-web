import React from "react"

import { DocumentCard } from "components/document/document-card"
import { useRegistrationStatus } from "hooks/account-hooks"
import { useSettings } from "hooks/use-settings"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function AnnouncementCard(props) {
  const { announcement } = props
  const { seasonEventId } = useSettings()
  const isMember = useRegistrationStatus(seasonEventId)

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
        <ReactMarkdown plugins={[gfm]}>{announcement.text}</ReactMarkdown>
        <div>
          {announcement.documents &&
            announcement.documents.map((doc) => {
              return <DocumentCard key={doc.id} document={doc} />
            })}
        </div>
      </div>
    )
  }
  return null
}

export default AnnouncementCard
