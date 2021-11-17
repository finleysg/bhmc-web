import React from "react"

import { CancelButton } from "components/button/buttons"
import { Formik } from "formik"
import Form from "react-bootstrap/Form"
import * as yup from "yup"

import { PhotoPicker } from "./photo-picker"
import { TagPicker } from "./tag-picker"

const schema = yup.object({
  year: yup.number().required(),
  caption: yup.string().max(240),
})

function PhotoUploadForm(props) {
  const { season, defaultTags, onSave, onCancel } = props
  const initialValues = {
    year: season,
    caption: "",
    tags: defaultTags,
    file: null,
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h5>Upload a new picture...</h5>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (values.file) {
            actions.setSubmitting(false)
            onSave(values)
          }
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <PhotoPicker onSelect={(files) => (values.file = files[0])} />
            {props.year === undefined && (
              <Form.Group controlId="doc.Year">
                <Form.Control
                  placeholder="Year..."
                  name="year"
                  value={values.year?.toString()}
                  isValid={touched.year && !errors.year}
                  isInvalid={!!errors.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group controlId="caption">
              <Form.Control
                placeholder="Enter a caption / description..."
                name="caption"
                value={values.caption}
                isValid={touched.caption && !errors.caption}
                isInvalid={!!errors.caption}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.caption}</Form.Control.Feedback>
            </Form.Group>
            <TagPicker
              defaultTags={defaultTags}
              selectedTags={values.tags || []}
              onChange={(tags) => (values.tags = tags)}
            />
            <button
              className="btn btn-success"
              style={{ marginRight: "1rem" }}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
            <CancelButton onClick={onCancel} />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export { PhotoUploadForm }
