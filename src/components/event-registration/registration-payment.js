import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import React from "react"

import {
  CreditCardList,
  StyledCardElement,
} from "components/credit-card"
import { ErrorDisplay } from "components/errors"
import { CheckBox } from "components/field/check-box"
import { OverlaySpinner } from "components/spinners"
import { useAuth } from "context/auth-context"
import { useEventRegistration } from "context/registration-context"
import { useMyCards } from "hooks/account-hooks"
import { toast } from "react-toastify"
import { getAmountDue } from "utils/payment-utils"

function RegistrationPayment(props) {
  const { onBack, onComplete, onCancel, selectedStart, title } = props
  const [paymentError, setPaymentError] = React.useState()
  const [paymentMethod, setPaymentMethod] = React.useState()
  const [isBusy, setIsBusy] = React.useState(false)
  const [saveCard, setSaveCard] = React.useState(false)
  const { user } = useAuth()
  const { clubEvent, payment } = useEventRegistration()
  const myCards = useMyCards()
  const stripe = useStripe()
  const elements = useElements()

  React.useEffect(() => {
    if (myCards === undefined || myCards.length === 0) {
      setPaymentMethod("new")
    } else {
      setPaymentMethod(myCards[0].paymentMethod)
    }
  }, [myCards])

  const amountDue = getAmountDue(payment, clubEvent.feeMap)

  const publishBusyFeedback = (busy) => {
    setIsBusy(busy)
  }

  const handleSaveCard = (evt) => {
    setSaveCard(evt.target.checked)
  }

  const handlePaymentClick = async () => {
    publishBusyFeedback(true)
    if (paymentMethod === "new") {
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
        publishBusyFeedback(false)
      } else {
        if (Boolean(paymentMethod)) {
          submitPayment(paymentMethod)
        } else {
          setPaymentError("No payment method was created!")
          publishBusyFeedback(false)
        }
      }
    } else {
      submitPayment({ id: paymentMethod })
    }
  }

  const submitPayment = async (method) => {
    try {
      // The setup_future_usage defaults to "on_session", unless this is a new card
      // and the player has not elected to save it.
      const thisPaymentMethod = {
        payment_method: method.id,
      }
      if (paymentMethod === "new" && saveCard) {
        thisPaymentMethod.setup_future_usage = "on_session"
      }
      const result = await stripe.confirmCardPayment(payment.paymentKey, thisPaymentMethod)
      if (result.error) {
        // publishBusyFeedback(false)
        toast.error("😟 Something went wrong.")
        const message = result.error.message
        setPaymentError(message)
      } else if (result.paymentIntent) {
        // publishBusyFeedback(false)
        toast.success("💸 Your payment has been accepted.")
        onComplete()
      }
    } finally {
      publishBusyFeedback(false)
    }
  }

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
          Amount due: ${amountDue.total.toFixed(2)}
        </h6>
        <div style={{ marginBottom: "1rem" }}>
          {myCards && myCards[0] && (
            <CreditCardList cards={myCards} onSelected={(pm) => setPaymentMethod(pm)} />
          )}
        </div>
        {paymentMethod === "new" && (
          <React.Fragment>
            <div style={{ marginBottom: "1rem" }}>
              <StyledCardElement />
            </div>
            <div>
              <CheckBox
                label="Save this card for future payments"
                checked={saveCard}
                onChange={handleSaveCard}
              />
            </div>
          </React.Fragment>
        )}
        <div>
          <ErrorDisplay error={paymentError} isError={paymentError !== undefined} />
        </div>
        <hr />
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-light" disabled={isBusy} onClick={onBack}>
            Back
          </button>
          <button className="btn btn-light" style={{ marginLeft: ".5rem" }} onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            disabled={isBusy}
            style={{ marginLeft: ".5rem" }}
            onClick={handlePaymentClick}
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPayment
