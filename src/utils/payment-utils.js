const transactionFixedCost = 0.3
const transactionPercentage = 0.029

/**
 * Calculates the transaction fee and total from a given subtotal
 * @param {number} subtotal
 */
const calculateFees = (subtotal, excludeTransactionFee = false) => {
  if (subtotal === 0) {
    return {
      subtotal: 0,
      transactionFee: 0,
      total: 0,
    }
  }

  const total = excludeTransactionFee
    ? subtotal
    : (subtotal + transactionFixedCost) / (1.0 - transactionPercentage)
  const transactionFee = excludeTransactionFee ? 0 : total - subtotal

  return {
    subtotal,
    transactionFee,
    total,
  }
}
/**
 * Calculates the amount due from the payment details
 * @param {Payment} payment - The payment record for the event registration flow
 * @param {Map} eventFees - The event fee map from the club event
 */
const getAmountDue = (payment, eventFees, excludeTransactionFee = false) => {
  if (Boolean(payment?.details) && payment.details.length > 0) {
    const subtotal = payment.details
      .map((detail) => eventFees.get(detail.eventFeeId).amount)
      .reduce((f1, f2) => f1 + f2, 0)
    return calculateFees(subtotal, excludeTransactionFee)
  } else {
    return {
      subtotal: 0,
      transactionFee: 0,
      total: 0,
    }
  }
}

export { calculateFees, getAmountDue }
