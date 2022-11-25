import React from "react"

import { FormGroup } from "components/field/forms"
import { Form, Formik } from "formik"
import * as Yup from "yup"

function PaymentForm({ amountDue, isBusy, onSubmit, onCancel, onBack }) {
  return (
    <Formik
      initialValues={{ amountDue, paymentCode: "" }}
      validationSchema={Yup.object({
        amountDue: Yup.number().required("An amount is required (0 is ok)"),
        paymentCode: Yup.string().max(40).required("Cash, check #, waived, etc."),
      })}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <FormGroup name="amountDue" type="text" label="Amount Due" />
        <FormGroup name="paymentCode" type="text" label="Payment Code (cash, check, waived...)" />
        <hr />
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-light" type="button" disabled={isBusy} onClick={onBack}>
            Back
          </button>
          <button className="btn btn-light" type="button" style={{ marginLeft: ".5rem" }} onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-success" type="submit" disabled={isBusy} style={{ marginLeft: ".5rem" }}>
            Save
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export { PaymentForm }
