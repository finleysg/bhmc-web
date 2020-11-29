const transactionFixedCost = 0.3
const transactionPercentage = 0.029

const calculateFees = (subtotal) => {
  if (subtotal === 0) {
    return {
      transactionFee: 0,
      total: 0,
    }
  }

  const total = (subtotal + transactionFixedCost) / (1.0 - transactionPercentage)
  const transactionFee = total - subtotal

  return {
    transactionFee,
    total,
  }
}

export { calculateFees }
