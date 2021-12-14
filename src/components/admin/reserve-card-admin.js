function ReserveCardAdmin({ reserveSlot, mode, onPlayerSelect, onGroupSelect, onOpenSelect, ...rest }) {
  const deriveClasses = () => {
    const className = "reserve-slot"
    if (reserveSlot.selected) {
      return className + " reserve-slot__selected"
    }
    return className + ` reserve-slot__${reserveSlot.statusName.toLowerCase()}`
  }

  if (mode === "select") {
    if (reserveSlot.status === "R") {
      return (
        <div className={deriveClasses()} {...rest}>
          <span style={{ cursor: "pointer" }} onClick={onPlayerSelect}>
            {reserveSlot.playerName}
          </span>{" "}
          <span style={{ cursor: "pointer" }} onClick={onGroupSelect}>
            [{reserveSlot.registrationId}]
          </span>
        </div>
      )
    } else {
      return (
        <div className="reserve-slot" {...rest}>
          open
        </div>
      )
    }
  } else {
    if (reserveSlot.status === "R") {
      return (
        <div className={deriveClasses()} {...rest}>
          <span>{reserveSlot.playerName}</span> <span>[{reserveSlot.registrationId}]</span>
        </div>
      )
    } else {
      return (
        <div className="reserve-slot" style={{ cursor: "move" }} onClick={onOpenSelect} {...rest}>
          open
        </div>
      )
    }
  }
}

export { ReserveCardAdmin }
