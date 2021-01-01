import React from "react"

import { useRegistrationStatus } from "hooks/account-hooks"
import { FiFileText } from "react-icons/fi"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

function DocumentButton({ document }) {
  return (
    <div style={{ textAlign: "center", marginRight: "1.5rem" }}>
      <a
        href={document.file}
        alt={document.title}
        style={{ color: colors.blueGrey }}
        target="_blank"
        rel="noreferrer"
      >
        <FiFileText style={{ fontSize: "4rem" }} />
        <p style={{ fontSize: ".8rem" }}>{document.title}</p>
      </a>
    </div>
  )
}
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
