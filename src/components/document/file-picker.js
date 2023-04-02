import styled from "@emotion/styled"

import { useDropzone } from "react-dropzone"

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676"
  }
  if (props.isDragReject) {
    return "#ff1744"
  }
  if (props.isDragActive) {
    return "#2196f3"
  }
  return "#eeeeee"
}

const FileDropContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`
FileDropContainer.displayName = "FileDropContainer"

const FileList = styled.aside`
  > ul {
    list-style-type: none;
    > li {
      color: #purple;
    }
  }
`
FileList.displayName = "FileList"

const defaultFileTypes =
  ".md,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/markdown,text/csv,text/plain"

function FilePicker(props) {
  const { multiple, accept, onSelected } = props
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
    useDropzone({
      multiple: multiple || false,
      accept: accept || defaultFileTypes,
      onDrop: (acceptedFiles) => {
        onSelected(acceptedFiles)
      },
    })

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  console.log(accept)

  return (
    <section className="container">
      <FileDropContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drop file here, or click to select</p>
      </FileDropContainer>
      <FileList>
        <ul>{files}</ul>
      </FileList>
    </section>
  )
}

export default FilePicker
