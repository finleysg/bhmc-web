import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import React from "react"

import { StandardConfirmDialog } from "components/confirm"
import { ManageCreditCards, StyledCardElement } from "components/credit-card"
import { ErrorDisplay } from "components/errors"
import { useAuth, useClient } from "context/auth-context"
import { useMyCards } from "hooks/account-hooks"
import { queryCache } from "react-query"
import { toast } from "react-toastify"

function MyCards() {
  const [action, setAction] = React.useState("idle")
  const [setupError, setSetupError] = React.useState()
  const [isBusy, setIsBusy] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [currentCard, setCurrentCard] = React.useState()

  const removeRef = React.useRef()
  const { user } = useAuth()
  const myCards = useMyCards()
  const stripe = useStripe()
  const elements = useElements()
  const client = useClient()

  const handleCardSetup = async () => {
    setIsBusy(true)

    try {
      const intent = await client("save-card", { method: "POST" })
      const result = await stripe.confirmCardSetup(intent.client_secret, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
          },
        },
      })

      if (result.error) {
        setSetupError(result.error)
        toast.error("💣 Failed to save new card.")
      } else {
        queryCache.invalidateQueries("my-cards")
        toast.success("💳 Your card has been saved for future use.")
      }
    } catch (err) {
      setSetupError(err)
      toast.error("💣 Failed to save new card.")
    }
    setIsBusy(false)
    setAction("idle")
  }

  const handleRemoveCard = async (card) => {
    if (!showConfirm) {
      setCurrentCard(card)
      setShowConfirm(true)
    } else {
      setShowConfirm(false)
      await client(`remove-card/${currentCard.paymentMethod}`, { method: "DELETE" })
      queryCache.invalidateQueries("my-cards")
      toast.success("💳 Your card has been removed.")
    }
  }

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Manage My Cards</h4>
          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-12">
              <ManageCreditCards
                cards={myCards}
                onAdd={() => setAction("add")}
                onRemove={handleRemoveCard}
              />
            </div>
          </div>
          {action === "add" && (
            <React.Fragment>
              <div className="row" style={{ marginBottom: "1rem" }}>
                <div className="col-12">
                  <StyledCardElement />
                </div>
              </div>
            </React.Fragment>
          )}
          <div className="row">
            <div className="col-12">
              <ErrorDisplay error={setupError} isError={setupError !== undefined} />
            </div>
          </div>
          <hr />
          <div className="row" style={{ textAlign: "right" }}>
            <div className="col-12">
              <button
                className="btn btn-primary"
                disabled={action === "idle" || isBusy}
                style={{ marginLeft: ".5rem" }}
                onClick={handleCardSetup}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {showConfirm && (
        <StandardConfirmDialog
          confirmRef={removeRef}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleRemoveCard}
        >
          <p>Are you sure you want to remove this card?</p>
        </StandardConfirmDialog>
      )}
    </React.Fragment>
  )
}

export default MyCards
