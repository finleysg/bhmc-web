import React from "react"

import {
  FormCheckbox,
  FormGroup,
} from "components/field/forms"
import {
  Form,
  Formik,
} from "formik"
import * as Yup from "yup"

function RefundForm({ refundAmount, isBusy, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={{ issueRefund: false, refundAmount: refundAmount, notes: "" }}
      validationSchema={Yup.object({
        issueRefund: Yup.bool(),
        refundAmount: Yup.number().when("issueRefund", {
          is: true,
          then: Yup.number().required("A refund amount is required"),
          otherwise: Yup.number().nullable(),
        }),
        notes: Yup.string().when("issueRefund", {
          is: true,
          then: Yup.string().required("Enter a message to accompany this refund"),
          otherwise: Yup.string().nullable(),
        }),
      })}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <FormCheckbox label="Issue a Refund?" name="issueRefund" />
        <FormGroup name="refundAmount" type="text" label="Refund Amount" />
        <FormGroup name="notes" type="text" label="Notes" />
        <hr />
        <div style={{ textAlign: "right" }}>
          <button
            className="btn btn-light"
            type="button"
            style={{ marginLeft: ".5rem" }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isBusy}
            style={{ marginLeft: ".5rem" }}
          >
            Save
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export { RefundForm }
