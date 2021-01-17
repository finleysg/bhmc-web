import React from "react"

import { CancelButton } from "components/button/buttons"
import FilePicker from "components/document/file-picker"
import { MdCameraAlt } from "react-icons/md"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  padding: 4,
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
}

function ProfilePicPicker(props) {
  const { onCancel, onSelect } = props
  const [files, setFiles] = React.useState([])

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  const preview = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className="pmb-block">
      <div className="pmbb-header">
        <h2>
          <MdCameraAlt /> Upload Profile Picture
        </h2>
      </div>
      <FilePicker
        onSelected={preview}
        onDrop={preview}
        accept=".gif,.jpg,.png,image/gif,image/jpeg,image/png"
      />
      <aside style={thumbsContainer}>{thumbs}</aside>
      <button
        className="btn btn-primary"
        style={{ marginRight: "1rem" }}
        onClick={() => onSelect(files[0])}
        disabled={files.length === 0}
      >
        Save
      </button>
      <CancelButton onClick={onCancel} />
    </div>
  )
}

export { ProfilePicPicker }
