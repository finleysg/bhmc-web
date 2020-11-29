import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import React from "react"

import { ErrorDisplay } from "components/errors"
import { useAuth } from "context/auth-context"
import { useEventRegistration } from "context/registration-context"
import { toast } from "react-toastify"

function EventRegistrationPayment(props) {
  const { onBack, onPaymentComplete } = props
  const [paymentError, setPaymentError] = React.useState()
  const { user } = useAuth()
  const { clubEvent, payment } = useEventRegistration()
  const stripe = useStripe()
  const elements = useElements()

  const handlePaymentClick = async () => {
    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      },
    })

    if (error) {
      setPaymentError(error.message)
    } else {
      if (paymentMethod !== undefined) {
        submitPayment(paymentMethod)
      } else {
        setPaymentError("No payment method was created!")
      }
    }
  }

  const submitPayment = async (method) => {
    const result = await stripe.confirmCardPayment(payment.paymentKey, {
      payment_method: method.id,
    })
    if (result.error) {
      toast.error("😟 Something went wrong.")
      const message = result.error.message
      setPaymentError(message)
    } else if (result.paymentIntent) {
      toast.success("💸 Your payment has been accepted.")
      onPaymentComplete()
    }
  }

  return (
    <div className="card-body">
      <h4 className="card-title">{clubEvent.name}</h4>
      <h6 className="card-subtitle">{payment?.paymentAmount}</h6>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-12">TODO: text or maybe cards to select from</div>
      </div>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-12">
          <CardElement
            className="form-control"
            options={{
              style: {
                base: {
                  color: "#212529",
                  lineHeight: "1.429",
                },
                invalid: {
                  color: "red",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-12">
          <ErrorDisplay error={paymentError} isError={paymentError !== undefined} />
        </div>
      </div>
      <hr />
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-12">
          <button className="btn btn-light" onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-success"
            style={{ marginLeft: "1rem" }}
            onClick={handlePaymentClick}
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrationPayment
