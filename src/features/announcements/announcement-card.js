import React from "react"

import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function AnnouncementCard(props) {
  const { announcement } = props

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{announcement.title}</h4>
        <div className="card-text">
          <ReactMarkdown source={announcement.text} plugins={[gfm]} escapeHtml={true} />
          <div className="row">
            <div className="col-12">TODO: render documents here</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
