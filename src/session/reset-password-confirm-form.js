import React from "react"

import { IconSubmitButton } from "components/button/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/field/forms"
import { Form, Formik } from "formik"
import { MdArrowForward } from "react-icons/md"
import { useParams } from "react-router-dom"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function ResetPasswordConfirmForm({ onSubmit }) {
  const { isError, isLoading, error, run } = useAsync()
  const { uid, token } = useParams()

  function handleSubmit(values) {
    // any 400 or 500 is displayed to the user
    run(onSubmit({ ...values, uid, token })).catch(() => {})
  }

  return (
    <Formik
      initialValues={{ new_password: "", re_new_password: "" }}
      validationSchema={Yup.object({
        new_password: Yup.string().required("Password is required"),
        re_new_password: Yup.string()
          .oneOf([Yup.ref("new_password"), null], "Passwords must match")
          .required("Password is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="new_password" type="password" label="Password" />
        <FormGroup name="re_new_password" type="password" label="Confirm password" />
        <IconSubmitButton loading={isLoading} color="green">
          <MdArrowForward style={{ marginTop: ".6rem" }} />
        </IconSubmitButton>
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { ResetPasswordConfirmForm }
