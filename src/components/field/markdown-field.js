import React from "react"

import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import { MarkdownEditor } from "./markdown-edit"

function MarkdownField({ text, mode, onChange }) {
  return (
    <div>
      {mode === "view" ? (
        <ReactMarkdown plugins={[gfm]} escapeHtml={true}>
          {text}
        </ReactMarkdown>
      ) : (
        <MarkdownEditor text={text} onChange={onChange} />
      )}
    </div>
  )
}

export { MarkdownField }
