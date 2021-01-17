import "@toast-ui/editor/dist/toastui-editor.css"
import "codemirror/lib/codemirror.css"

import { Editor } from "@toast-ui/react-editor"

import React from "react"

function MarkdownEditor({ text, onChange, ...props }) {
  const editorRef = React.useRef()

  const handleChange = () => {
    const content = editorRef.current?.getInstance().getMarkdown() || text
    onChange({
      source: "markdown",
      content,
    })
  }

  return (
    <div>
      <Editor
        initialValue={text}
        previewStyle="tab"
        initialEditType="wysiwyg"
        useDefaultHTMLSanitizer={true}
        onChange={handleChange}
        toolbarItems={[
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          "image",
          "link",
        ]}
        ref={editorRef}
        {...props}
      />
    </div>
  )
}

export { MarkdownEditor }
