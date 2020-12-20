/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { SavedCard } from "models/payment"
import { FaCcDinersClub } from "react-icons/fa"
import { GiCheckMark } from "react-icons/gi"
import { GoPlusSmall } from "react-icons/go"
import { SiAmericanexpress, SiDiscover, SiJcb, SiMastercard, SiVisa } from "react-icons/si"

function CreditCardList(props) {
  const { cards, onSelected } = props
  const newCard = new SavedCard({
    id: "new",
    billing_details: {},
    card: {},
  })
  const [selectedCard, setSelectedCard] = React.useState()

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
      <CreditCard card={newCard} onSelect={handleSelection} selected={selectedCard === "new"} />
    </div>
  )
}

function CreditCard(props) {
  const { card, selected, onSelect } = props

  const cardStyle = {
    width: "35px",
    height: "24px",
    fontSize: "2rem",
    textAlign: "center",
    borderRadius: "3px",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "hidden",
  }

  const cardImage = (brand) => {
    switch (brand) {
      case "visa":
        return <SiVisa style={{ marginTop: "-2px" }} />
      case "mastercard":
        return <SiMastercard style={{ marginTop: "-2px" }} />
      case "disover":
        return <SiDiscover style={{ marginTop: "-2px" }} />
      case "amex":
        return <SiAmericanexpress style={{ marginTop: "-2px" }} />
      case "jcb":
        return <SiJcb style={{ marginTop: "-2px" }} />
      case "diners":
        return <FaCcDinersClub style={{ marginTop: "-2px" }} />
      default:
        return <GoPlusSmall style={{ marginTop: "-2px" }} />
    }
  }

  const cardName = (brand) => {
    switch (brand) {
      case "visa":
        return "Visa"
      case "mastercard":
        return "Mastercard"
      case "disover":
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

  return (
    <div
      className={selected ? "text-primary" : "text-muted"}
      style={{ display: "flex", cursor: "pointer", marginBottom: "1em" }}
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
        {/* {card.isExpired ? (
          <span style={{ marginLeft: "8px" }} className="text-warning">
            {" "}
            [expired]
          </span>
        ) : (
          <span style={{ marginLeft: "8px" }}>[exp {card.expires}]</span>
        )} */}
      </div>
      <div style={{ flex: "1", textAlign: "right" }}>{selected && <GiCheckMark />}</div>
    </div>
  )
}

export { CreditCard, CreditCardList }
