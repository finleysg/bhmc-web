import React from "react"

import { IconSubmitButton } from "components/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/forms"
import { Form, Formik } from "formik"
import { MdArrowForward } from "react-icons/md"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function ResetPasswordForm({ onSubmit }) {
  const { isError, isLoading, error, run } = useAsync()

  function handleSubmit(values) {
    // any 400 or 500 is displayed to the user
    run(onSubmit(values)).catch(() => {})
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="email" type="text" label="Email" />
        <IconSubmitButton loading={isLoading} color="blue">
          <MdArrowForward style={{ marginTop: ".6rem" }} />
        </IconSubmitButton>
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { ResetPasswordForm }
