import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import React from "react"

import { CreditCardList, StyledCardElement } from "components/credit-card"
import { ErrorDisplay } from "components/errors"
import { useAuth } from "context/auth-context"
import { useEventRegistration } from "context/registration-context"
import { useMyCards } from "hooks/account-hooks"
import { toast } from "react-toastify"

function EventRegistrationPayment(props) {
  const { onBack, onComplete, onCancel, onBusy } = props
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

  const formattedPaymentAmount = (payment) => {
    const amt = Number(payment?.paymentAmount || 0)
    return `$${amt.toFixed(2)}`
  }

  const publishBusyFeedback = (busy) => {
    setIsBusy(busy)
    onBusy(busy)
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
        if (paymentMethod !== undefined) {
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
      publishBusyFeedback(false)
      toast.error("😟 Something went wrong.")
      const message = result.error.message
      setPaymentError(message)
    } else if (result.paymentIntent) {
      publishBusyFeedback(false)
      toast.success("💸 Your payment has been accepted.")
      onComplete()
    }
  }

  return (
    <div className="card-body">
      <h4 className="card-title">{clubEvent.name}</h4>
      <h6 className="card-subtitle">{formattedPaymentAmount(payment)}</h6>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-12">
          {myCards && myCards[0] && (
            <CreditCardList cards={myCards} onSelected={(pm) => setPaymentMethod(pm)} />
          )}
        </div>
      </div>
      {paymentMethod === "new" && (
        <React.Fragment>
          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-12">
              <StyledCardElement />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="checkbox">
                <input
                  id="saveCard"
                  type="checkbox"
                  value={saveCard}
                  checked={saveCard}
                  onChange={handleSaveCard}
                />
                <label className="checkbox__label" htmlFor="saveCard">
                  Save this card for future payments
                </label>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="row">
        <div className="col-12">
          <ErrorDisplay error={paymentError} isError={paymentError !== undefined} />
        </div>
      </div>
      <hr />
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-12">
          <button className="btn btn-light" disabled={isBusy} onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-light"
            disabled={isBusy}
            style={{ marginLeft: ".5rem" }}
            onClick={onCancel}
          >
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

export default EventRegistrationPayment
