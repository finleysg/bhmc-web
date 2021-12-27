import React from "react"

import { SubmitButton } from "components/button/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup, SelectGroup } from "components/field/forms"
import { Form, Formik } from "formik"
import { useCopyEvent } from "hooks/event-hooks"
import { toast } from "react-toastify"
import * as Yup from "yup"

function EventCopyForm({ availableEvents }) {
  const { mutate: copy, isLoading, isError, error } = useCopyEvent()

  const emptyValues = {
    eventId: -1,
    startDate: new Date(),
  }

  async function handleSubmit(values) {
    await copy(values, {
      onSuccess: () => {
        const selectedEvent = availableEvents.find((e) => e.value.toString() === values.eventId)
        toast.success(`👍 ${selectedEvent.name} has been copied to ${values.startDate}`)
      },
      onError: (err) => {
        console.error(err)
        toast.error("💣 Aww, Snap! Failed to copy the event: " + err)
      },
    })
  }

  return (
    <Formik
      initialValues={emptyValues}
      validationSchema={Yup.object({
        eventId: Yup.number().required("We need a source event to copy from."),
        startDate: Yup.date().required("We need a start date for the new (target) event."),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values).then(() => {
          resetForm(emptyValues)
          setSubmitting(false)
        })
      }}
    >
      <Form>
        <SelectGroup name="eventId" label="Source event" options={availableEvents} />
        <FormGroup name="startDate" type="date" label="Target start date" />
        <SubmitButton loading={isLoading} label="Copy" style={{ marginRight: "1rem" }} />
        <ErrorDisplay isError={isError} error={error} />
      </Form>
    </Formik>
  )
}

export { EventCopyForm }
