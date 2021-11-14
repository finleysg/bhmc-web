function ReserveCard({ reserveSlot, onSelect, ...rest }) {
  const handleSelect = () => {
    if (reserveSlot.canSelect()) {
      onSelect(reserveSlot)
    }
  }

  const deriveClasses = () => {
    const className = "reserve-slot"
    if (reserveSlot.selected) {
      return className + " reserve-slot__selected"
    }
    return className + ` reserve-slot__${reserveSlot.statusName.toLowerCase().replace(" ", "-")}`
  }

  return (
    <div className={deriveClasses()} onClick={handleSelect} {...rest}>
      <span>{reserveSlot.displayText()}</span>
    </div>
  )
}

export { ReserveCard }
