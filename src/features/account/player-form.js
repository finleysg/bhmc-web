import React from "react"

import { CancelButton, SubmitButton } from "components/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/forms"
import { Form, Formik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { useUpdatePlayer } from "../../hooks/account-hooks"

function PlayerForm({ player, onClose }) {
  const { mutate: update, isLoading, isError, error } = useUpdatePlayer()

  async function handleSubmit(values) {
    const playerUpdates = { id: player.id, ...values }
    await update(playerUpdates, {
      onSuccess: () => {
        toast.success("👍 Your profile changes have been saved")
        onClose()
      },
    })
  }

  return (
    <Formik
      initialValues={{
        email: player.email,
        first_name: player.first_name,
        last_name: player.last_name,
        ghin: player.ghin ?? "",
        birth_date: player.birth_date,
        phone_number: player.phone_number ?? "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
        first_name: Yup.string().max(30).required("First name is required"),
        last_name: Yup.string().max(30).required("Last name is required"),
        ghin: Yup.string().max(8),
        birth_date: Yup.date(),
        phone_number: Yup.string().nullable(),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="email" type="text" label="Email" />
        <FormGroup name="first_name" type="text" label="First name" />
        <FormGroup name="last_name" type="text" label="Last name" />
        <FormGroup name="ghin" type="text" label="GHIN" />
        <FormGroup name="birth_date" type="date" label="Birth date" />
        <FormGroup name="phone_number" type="text" label="Phone number" />
        <SubmitButton loading={isLoading} style={{ marginRight: "1rem" }} />
        <CancelButton loading={isLoading} onCancel={onClose} />
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { PlayerForm }
