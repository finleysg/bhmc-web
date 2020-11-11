import React from "react"

import { IconSubmitButton } from "components/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/forms"
import { Form, Formik } from "formik"
import { MdArrowForward } from "react-icons/md"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function LoginForm({ onSubmit }) {
  const { isError, isLoading, error, run } = useAsync()

  function handleSubmit(values) {
    // any 400 or 500 is displayed to the user
    run(onSubmit(values)).catch(() => {})
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="email" type="text" label="Email" />
        <FormGroup name="password" type="password" label="Password" />
        <IconSubmitButton loading={isLoading} color="green">
          <MdArrowForward style={{ marginTop: ".6rem" }} />
        </IconSubmitButton>
        {isError ? <ErrorDisplay error={error} /> : null}
      </Form>
    </Formik>
  )
}

export { LoginForm }
