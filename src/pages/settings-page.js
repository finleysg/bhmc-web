import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import React from "react"

import { CardContent } from "components/content"
import { ManageCreditCards, StyledCardElement } from "components/credit-card"
import { ErrorDisplay } from "components/errors"
import { useAuth, useClient } from "context/auth-context"
import { useMyCards } from "hooks/account-hooks"
import { toast } from "react-toastify"

function SettingsPage() {
  const [action, setAction] = React.useState("idle")
  const [setupError, setSetupError] = React.useState()
  const [isBusy, setIsBusy] = React.useState(false)

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
        toast.error("Failed to save new card.")
      } else {
        // TODO: invalidate my-cards
        toast.success("Your card has been saved for future use.")
      }
    } catch (err) {
      setSetupError(err)
      toast.error("Failed to save new card.")
    }
    setIsBusy(false)
    setAction("idle")
  }

  const handleUpdateCard = () => {}

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>My Settings</h1>
      </header>
      <div className="row">
        <div className="col-md-6 col-12">
          <CardContent contentKey="player-settings" />
        </div>
        <div className="col-md-6 col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Manage My Cards</h4>
              <div className="row" style={{ marginBottom: "1rem" }}>
                <div className="col-12">
                  <ManageCreditCards
                    cards={myCards}
                    onAdd={() => setAction("add")}
                    onUpdate={handleUpdateCard}
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
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
