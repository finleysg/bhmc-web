import React from "react"

import { SubmitButton } from "components/button/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup, FormGroupAsTextarea } from "components/field/forms"
import { useAuth } from "context/auth-context"
import { Form, Formik } from "formik"
import { MdEmail } from "react-icons/md"
import { useAsync } from "utils/use-async"
import * as Yup from "yup"

function ContactForm({ onSubmit }) {
  const { isError, isLoading, error, run } = useAsync()
  const { user } = useAuth()

  function handleSubmit(values) {
    // any 400 or 500 is displayed to the user
    run(onSubmit(values)).catch(() => {})
  }

  return (
    <Formik
      initialValues={{
        full_name: user.is_authenticated ? `${user.first_name} ${user.last_name}` : "",
        email: user.is_authenticated ? user.email : "",
        message_text: "",
      }}
      validationSchema={Yup.object({
        full_name: Yup.string().required("Your name is required"),
        email: Yup.string().email("Invalid email address").required("A valid email is required"),
        message_text: Yup.string().required("You must have something to say?"),
      })}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form>
        <FormGroup name="full_name" type="text" label="Full name" />
        <FormGroup name="email" type="text" label="Email" />
        <FormGroupAsTextarea name="message_text" type="text" rows="6" label="Message" />
        <SubmitButton loading={isLoading} label="Send">
          <MdEmail style={{ marginTop: ".6rem" }} />
        </SubmitButton>
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { ContactForm }
