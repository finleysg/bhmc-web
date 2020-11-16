import React from "react"

import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

import { MarkdownEditor } from "./markdown-edit"

function MarkdownField({ text, mode, onChange }) {
  return (
    <div>
      {mode === "view" ? (
        <ReactMarkdown source={text} plugins={[gfm]} escapeHtml={true} />
      ) : (
        <MarkdownEditor text={text} onChange={onChange} />
      )}
    </div>
  )
}

export { MarkdownField }
