import React from "react"

import { CheckBox } from "components/field/check-box"
import * as colors from "styles/colors"

function RegistrationItemCheckbox(props) {
  const { isRequired, isSelected, onChange } = props

  const handleChange = () => {
    onChange(!isSelected)
  }

  const getTitle = () => {
    if (isSelected) {
      return "Remove from registration"
    }
    return "Add to registration"
  }

  return (
    <CheckBox
      title={getTitle()}
      checked={isSelected}
      onChange={handleChange}
      disabled={isRequired}
    />
  )
}

function RegistrationItemRow(props) {
  const { index, slot, fee, selected, onAdd, onRemove, onRemovePlayer } = props
  const [isSelected, setIsSelected] = React.useState(selected)

  React.useEffect(() => {
    if (slot.playerId === 0) {
      setIsSelected(false)
    } else if (fee.isRequired) {
      setIsSelected(true)
    }
  }, [fee, slot])

  const handleItemSelection = (value) => {
    setIsSelected(value)
    if (value) {
      onAdd(fee)
    } else {
      onRemove(fee)
    }
  }

  return (
    <div className="row" style={{ minHeight: "32px" }}>
      {index === 0 ? (
        <div className="col-md-3 col-12 my-auto">
          {slot.playerId === 0 && <strong>Add a player</strong>}
          {slot.playerId !== 0 && (
            <>
              <strong>{slot.playerName}</strong>
              <button className="btn btn-link text-danger" onClick={() => onRemovePlayer(slot)}>
                (remove)
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="col-md-3 hidden-sm-down my-auto"></div>
      )}
      <div className="col-md-1 col-2 my-auto">
        <RegistrationItemCheckbox
          isRequired={fee.isRequired}
          isSelected={isSelected}
          onChange={handleItemSelection}
        />
      </div>
      <div className="col-md-5 col-7 my-auto">
        {fee.name} (${fee.amount})
      </div>
      <div className="col-md-3 col-3 my-auto" style={{ textAlign: "right" }}>
        ${isSelected ? fee.amount.toFixed(2) : "0.00"}
      </div>
    </div>
  )
}

function RegistrationTransactionFeeRow({ amountDue }) {
  return (
    <div className="row" style={{ minHeight: "32px" }}>
      <div className="col-md-3 hidden-sm-down my-auto"></div>
      <div className="col-md-1 col-2 my-auto"></div>
      <div className="col-md-5 col-7 my-auto">Transaction (30¢ + 2.9%)</div>
      <div className="col-md-3 col-3 my-auto" style={{ textAlign: "right" }}>
        ${amountDue?.transactionFee?.toFixed(2) ?? "0.00"}
      </div>
    </div>
  )
}

function RegistrationAmountDueRow({ amountDue }) {
  return (
    <div className="row" style={{ minHeight: "32px" }}>
      <div className="col-md-3 hidden-sm-down my-auto"></div>
      <div className="col-md-1 col-2 my-auto"></div>
      <div className="col-md-5 col-7 my-auto">Amount Due</div>
      <div className="col-md-3 col-3 my-auto" style={{ textAlign: "right" }}>
        <span style={{ fontWeight: 700, borderTop: `solid 2px ${colors.gray500}` }}>
          ${amountDue?.total?.toFixed(2) ?? "0.00"}
        </span>
      </div>
    </div>
  )
}

export { RegistrationAmountDueRow, RegistrationItemRow, RegistrationTransactionFeeRow }
