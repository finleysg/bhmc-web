import React from "react"

import { CancelButton, SubmitButton } from "components/button/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/field/forms"
import { useAuth } from "context/auth-context"
import { Form, Formik } from "formik"
import { toast } from "react-toastify"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function ChangePasswordForm({ onClose }) {
  const { isError, isLoading, error, run } = useAsync()
  const { changePassword } = useAuth()

  function handleSubmit(values) {
    run(changePassword({ ...values }))
      .then(() => {
        toast.success("👍 Your password has been changed")
        onClose()
      })
      .catch(() => {})
  }

  return (
    <Formik
      initialValues={{ new_password: "", re_new_password: "" }}
      validationSchema={Yup.object({
        current_password: Yup.string().required("Current password is required"),
        new_password: Yup.string().required("New password is required"),
        re_new_password: Yup.string()
          .oneOf([Yup.ref("new_password"), null], "Passwords must match")
          .required("New password is required"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="current_password" type="password" label="Current password" />
        <FormGroup name="new_password" type="password" label="New password" />
        <FormGroup name="re_new_password" type="password" label="Confirm new password" />
        <SubmitButton loading={isLoading} style={{ marginRight: "1rem" }} />
        <CancelButton loading={isLoading} onCancel={onClose} />
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { ChangePasswordForm }
