import React from "react"

import { IconSubmitButton } from "components/buttons"
import { DuplicateEmailDisplay, ErrorDisplay } from "components/errors"
import { FormGroup } from "components/forms"
import { Form, Formik } from "formik"
import { MdArrowForward } from "react-icons/md"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function RegisterForm({ onSubmit }) {
  const { isError, isLoading, error, run } = useAsync()
  const isDuplicate = error?.indexOf("user already exists") >= 0

  function handleSubmit(values) {
    // any 400 or 500 is displayed to the user
    run(onSubmit(values)).catch(() => {})
  }

  return (
    <Formik
      initialValues={{ first_name: "", last_name: "", email: "", password: "", re_password: "" }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
        password: Yup.string().required("Password is required"),
        re_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Password is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="first_name" type="text" label="First name" />
        <FormGroup name="last_name" type="text" label="Last name" />
        <FormGroup name="email" type="text" label="Email" />
        <FormGroup name="password" type="password" label="Password" />
        <FormGroup name="re_password" type="password" label="Confirm password" />
        <IconSubmitButton loading={isLoading} color="blue">
          <MdArrowForward style={{ marginTop: ".6rem" }} />
        </IconSubmitButton>
        {isError && !isDuplicate && <ErrorDisplay error={error} />}
        {isDuplicate && <DuplicateEmailDisplay />}
      </Form>
    </Formik>
  )
}

export { RegisterForm }
