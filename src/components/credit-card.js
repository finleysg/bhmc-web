/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { CardElement } from "@stripe/react-stripe-js"

import React from "react"

import { SavedCard } from "models/payment"
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa"
import { GiCheckMark } from "react-icons/gi"
import { GoPlusSmall } from "react-icons/go"

const cardStyle = {
  //   width: "35px",
  //   height: "24px",
  fontSize: "2rem",
  textAlign: "center",
  //   borderRadius: "3px",
  //   borderStyle: "solid",
  //   borderWidth: "1px",
  //   overflow: "hidden",
}

const cardImage = (brand) => {
  switch (brand) {
    case "visa":
      return <FaCcVisa />
    case "mastercard":
      return <FaCcMastercard />
    case "discover":
      return <FaCcDiscover />
    case "amex":
      return <FaCcAmex />
    case "jcb":
      return <FaCcJcb />
    case "diners":
      return <FaCcDinersClub />
    default:
      return <GoPlusSmall />
  }
}

const cardName = (brand) => {
  switch (brand) {
    case "visa":
      return "Visa"
    case "mastercard":
      return "Mastercard"
    case "discover":
      return "Discover"
    case "jcb":
      return "JCB"
    case "diners":
      return "Diners Club"
    case "amex":
      return "American Express"
    default:
      return brand
  }
}

function CreditCardList(props) {
  const { cards, onSelected } = props
  const newCard = new SavedCard({
    id: "new",
    billing_details: {},
    card: {},
  })
  const [selectedCard, setSelectedCard] = React.useState()

  React.useEffect(() => {
    if (cards && cards.length > 0) {
      setSelectedCard(cards[0].paymentMethod)
    }
  }, [cards])

  const handleSelection = (paymentMethod) => {
    setSelectedCard(paymentMethod)
    onSelected(paymentMethod)
  }

  return (
    <div>
      {cards &&
        cards.map((card) => {
          return (
            <CreditCard
              key={card.paymentMethod}
              card={card}
              selected={selectedCard === card.paymentMethod}
              onSelect={handleSelection}
            />
          )
        })}
      <CreditCard
        card={newCard}
        onSelect={handleSelection}
        selected={selectedCard === "new"}
        {...props}
      />
    </div>
  )
}

function ManageCreditCards(props) {
  const { cards, onAdd, onUpdate } = props

  const handleSelection = (paymentMethod) => {
    if (paymentMethod === "new") {
      onAdd()
    } else {
      onUpdate(paymentMethod)
    }
  }

  return (
    <div>
      {cards &&
        cards.map((card) => {
          return (
            <ManagedCreditCard key={card.paymentMethod} card={card} onSelect={handleSelection} />
          )
        })}
      <div style={{ display: "flex", cursor: "pointer" }} onClick={() => onAdd("new")}>
        <div style={{ flex: "1" }}>
          <div css={cardStyle}>{cardImage("add")}</div>
        </div>
        <div style={{ flex: "6" }}>
          <span style={{ marginLeft: "8px" }}>
            <strong>Add a payment method</strong>
          </span>
        </div>
      </div>
    </div>
  )
}

function CreditCard(props) {
  const { card, selected, onSelect } = props

  return (
    <div
      className={selected ? "text-primary" : "text-muted"}
      style={{ display: "flex", cursor: "pointer" }}
      onClick={() => onSelect(card.paymentMethod)}
    >
      <div style={{ flex: "1" }}>
        <div css={cardStyle}>{cardImage(card.brand)}</div>
      </div>
      <div style={{ flex: "4" }}>
        <span style={{ marginLeft: "8px" }}>
          {card.paymentMethod === "new" ? (
            <strong>Use a new card</strong>
          ) : (
            <React.Fragment>
              <strong>{cardName(card.brand)}</strong> ending in <strong>{card.last4}</strong>
            </React.Fragment>
          )}
        </span>
      </div>
      <div style={{ flex: "1", textAlign: "right" }}>{selected && <GiCheckMark />}</div>
    </div>
  )
}

function ManagedCreditCard(props) {
  const { card, onSelect } = props

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <div css={cardStyle}>{cardImage(card.brand)}</div>
      </div>
      <div style={{ flex: "4" }}>
        <span style={{ marginLeft: "8px" }}>
          <strong>{cardName(card.brand)}</strong> ending in <strong>{card.last4}</strong>
        </span>
      </div>
      <div style={{ flex: "2" }}>
        {card.isExpired ? (
          <span>
            <span className="text-warning">expired</span> (
            <button className="btn btn-link" onClick={() => onSelect(card.paymentMethod)}>
              update
            </button>
            )
          </span>
        ) : (
          <span>exp {card.expires}</span>
        )}
      </div>
    </div>
  )
}

function StyledCardElement() {
  return (
    <CardElement
      className="form-control"
      options={{
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      }}
    />
  )
}

export { CreditCardList, ManageCreditCards, StyledCardElement }
