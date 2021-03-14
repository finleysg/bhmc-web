import React from "react"

import { MarkdownEditor } from "components/field/markdown-edit"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function TextEditor(props) {
  const { text, layout, onSave } = props
  const [updatedText, setUpdatedText] = React.useState(text)

  const handleChange = (e) => {
    setUpdatedText(e.content)
  }

  const handleSave = () => {
    onSave(updatedText)
  }

  return (
    <React.Fragment>
      {layout === "side-by-side" && (
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-success">Edit Text Here</h6>
            <MarkdownEditor text={text} onChange={handleChange} />
            <div style={{ display: "flex" }}>
              <button className="btn btn-sm btn-success mt-2 mr-2" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="text-success">Rendered on the Website</h6>
            <ReactMarkdown source={updatedText} plugins={[gfm]} escapeHtml={true} />
          </div>
        </div>
      )}
      {layout === "side-by-side" || (
        <React.Fragment>
          <div className="mb-3">
            <h6 className="text-success">Edit Text Here</h6>
            <MarkdownEditor text={text} onChange={handleChange} />
            <div style={{ display: "flex" }}>
              <button className="btn btn-sm btn-success mt-2 mr-2" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
          <div>
            <h6 className="text-success">Rendered on the Website</h6>
            <ReactMarkdown source={updatedText} plugins={[gfm]} escapeHtml={true} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export { TextEditor }
