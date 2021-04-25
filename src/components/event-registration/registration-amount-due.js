import React from "react"

import * as colors from "styles/colors"

function RegistrationAmountDue({ amountDue }) {
  if (Boolean(amountDue?.total)) {
    return (
      <>
        <div className="summary">
          <div className="summary--item">Subtotal:</div>
          <div className="summary--amount">${amountDue.subtotal.toFixed(2)}</div>
        </div>
        <div className="summary">
          <div className="summary--item">Transaction (30¢ + 2.9%):</div>
          <div className="summary--amount">${amountDue.transactionFee.toFixed(2)}</div>
        </div>
        <div className="summary">
          <div className="summary--item">Total amount due:</div>
          <div className="summary--amount">
            <span style={{ fontWeight: 700, borderTop: `solid 2px ${colors.gray500}` }}>
              ${amountDue.total.toFixed(2)}
            </span>
          </div>
        </div>
      </>
    )
  }
  return null
}

export default RegistrationAmountDue
