import React from "react"

import FilePicker from "components/document/file-picker"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 8,
  width: "100%",
  padding: 4,
}

const thumbInner = {
  maxWidth: "240px",
  maxHeight: "240px",
  overflow: "hidden",
}

const photo = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
}

function PhotoPicker(props) {
  const { onSelect } = props
  const [files, setFiles] = React.useState([])

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  const preview = (acceptedFiles) => {
    onSelect(acceptedFiles)
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
        <img src={file.preview} style={photo} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div>
      <FilePicker onSelected={preview} onDrop={preview} accept=".gif,.jpg,.png,image/gif,image/jpeg,image/png" />
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  )
}

export { PhotoPicker }
