import React from "react"

import { TooltipButton } from "components/button/buttons"
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import * as colors from "styles/colors"

function AddRegistrationItem(props) {
  const { onClick } = props
  return (
    <TooltipButton
      label="Add to registration"
      highlight={colors.success}
      onClick={onClick}
      icon={<FaPlusCircle />}
    />
  )
}

function RemoveRegistrationItem(props) {
  const { isRequired, onClick } = props
  return (
    <TooltipButton
      label="Remove from registration"
      highlight={isRequired ? colors.gray300 : colors.warning}
      disabled={isRequired}
      onClick={onClick}
      icon={<FaMinusCircle />}
    />
  )
}

function RegistrationItemRow(props) {
  const { index, player, fee, selected, onAdd, onRemove } = props
  const [isSelected, setIsSelected] = React.useState(fee.isRequired || selected)

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
          <strong>{player?.name}</strong>
        </div>
      ) : (
        <div className="col-md-3 hidden-sm-down my-auto"></div>
      )}
      <div className="col-md-1 col-2 my-auto">
        {isSelected ? (
          <RemoveRegistrationItem
            isRequired={fee.isRequired}
            onClick={() => handleItemSelection(false)}
          />
        ) : (
          <AddRegistrationItem onClick={() => handleItemSelection(true)} />
        )}
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
