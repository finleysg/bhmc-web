import "@reach/dialog/styles.css"

import React from "react"

import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function PolicyDetail({ policy }) {
  const { title, description } = policy
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{title}</h4>
        <div className="card-text">
          <ReactMarkdown plugins={[gfm]}>{description}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export { PolicyDetail }
