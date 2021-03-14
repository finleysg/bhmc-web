import React from "react"

import {
  CancelButton,
  SubmitButton,
} from "components/button/buttons"
import FilePicker from "components/document/file-picker"
import { ErrorDisplay } from "components/errors"
import {
  FormGroup,
  SelectGroup,
} from "components/field/forms"
import {
  Form,
  Formik,
} from "formik"
import { documentTypeMap } from "models/document"
import { CgFileDocument } from "react-icons/cg"
import * as Yup from "yup"

const acceptedDocuments =
  ".pdf,.xls,.xlsx,.txt,.csv,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/markdown,text/csv,text/plain"

function DocumentForm({ onSubmit, onCancel, title, documentType, isLoading, error, isError }) {
  const [files, setFiles] = React.useState([])

  const getDocumentTypeOptions = () => {
    const options = []
    documentTypeMap.forEach((value, key) => {
      options.push({ value: key, name: value })
    })
    return options
  }

  const handleFileSelected = (files) => {
    setFiles(files)
  }

  return (
    <Formik
      initialValues={{
        title: title,
        documentType: documentType,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("A document title is required"),
        documentType: Yup.string().required("A document type is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values, files[0])
        setFiles([])
        resetForm()
      }}
      enableReinitialize={true}
    >
      <Form>
        <FormGroup name="title" type="text" label="Title" />
        <SelectGroup name="documentType" label="Type" options={getDocumentTypeOptions()} />
        <FilePicker
          onSelected={handleFileSelected}
          onDrop={handleFileSelected}
          accept={acceptedDocuments}
        />
        <SubmitButton loading={isLoading} label="Save" disabled={files.length === 0}>
          <CgFileDocument style={{ marginTop: ".6rem" }} />
        </SubmitButton>
        <CancelButton onCancel={onCancel} style={{ marginLeft: "1rem" }} />
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export default DocumentForm
