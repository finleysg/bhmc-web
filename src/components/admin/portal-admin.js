import React from "react"

import { CancelButton, SubmitButton } from "components/button/buttons"
import { ErrorDisplay } from "components/errors"
import { FormGroup } from "components/field/forms"
import { Form, Formik } from "formik"
import { useEventPatch } from "hooks/admin-hooks"
import { CgWebsite } from "react-icons/cg"
import * as Yup from "yup"

function PortalAdmin({ clubEvent, onCancel }) {
  const { mutate: patchEvent, isError, isLoading, error } = useEventPatch()

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">Add or Edit the Golf Genius Portal</h4>
        <p>
          Current portal url:{" "}
          <a href={clubEvent?.portalUrl ?? ""} target="_blank" rel="noreferrer">
            {clubEvent?.portalUrl ?? "No url"}
          </a>
        </p>
        <Formik
          initialValues={{
            portalUrl: clubEvent?.portalUrl ?? "",
          }}
          validationSchema={Yup.object({
            portalUrl: Yup.string().url().required("Copy the event's portal url from Golf Genius"),
          })}
          onSubmit={(values, { resetForm }) => {
            patchEvent({ id: clubEvent.id, portal_url: values.portalUrl })
            resetForm()
          }}
          enableReinitialize={true}
        >
          <Form>
            <FormGroup name="portalUrl" type="text" label="GG Portal Url" />
            <SubmitButton loading={isLoading} label="Save">
              <CgWebsite style={{ marginTop: ".6rem" }} />
            </SubmitButton>
            <CancelButton onCancel={onCancel} style={{ marginLeft: "1rem" }} />
            <ErrorDisplay isError={isError} error={error} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export { PortalAdmin }
