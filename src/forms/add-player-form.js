import React from "react"

import { CancelButton, SubmitButton } from "components/button/buttons"
import { FormGroup } from "components/field/forms"
import { Form, Formik } from "formik"
import * as Yup from "yup"

function AddPlayerForm({ onSubmit, onCancel, isLoading }) {
  function handleSubmit(values) {
    onSubmit(values)
  }

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        ghin: "",
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
        ghin: Yup.string().nullable(),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="first_name" type="text" label="First name" />
        <FormGroup name="last_name" type="text" label="Last name" />
        <FormGroup name="email" type="text" label="Email" />
        <FormGroup name="ghin" type="text" label="GHIN" />
        <SubmitButton loading={isLoading} style={{ marginRight: "1rem" }} />
        <CancelButton loading={isLoading} onCancel={onCancel} />
      </Form>
    </Formik>
  )
}

export { AddPlayerForm }
