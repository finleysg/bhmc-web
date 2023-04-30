import { ReserveCardAdmin } from "./reserve-card-admin"

function ReserveRowAdmin({
  courseName,
  group,
  mode,
  onPlayerSelect,
  onGroupSelect,
  onDrop,
  onSwap,
  onMove,
  onMoveConfirm,
  ...rest
}) {
  const disableActions = () => {
    return group.selectedSlotIds().length === 0
  }

  const disableEdit = () => {
    return group.selectedSlotIds().length !== 1
  }

  return (
    <div className={`reserve-group reserve-group__${courseName.toLowerCase()}`} {...rest}>
      <div className="reserve-group-name" style={{ minWidth: "260px" }}>
        <span>{group.name}</span>
        <button
          className="btn btn-sm btn-primary"
          disabled={disableActions()}
          onClick={() => onMove(group.selectedSlotIds())}
        >
          {mode === "select" ? "Move" : "Cancel"}
        </button>
        <button className="btn btn-sm btn-warning" disabled={disableEdit()} onClick={onSwap}>
          Swap
        </button>
        <button
          className="btn btn-sm btn-danger"
          disabled={disableActions() || mode === "move"}
          onClick={() => onDrop(group.selectedSlotIds())}
        >
          Drop
        </button>
      </div>
      {group.slots.map((slot) => (
        <ReserveCardAdmin
          key={slot.id}
          reserveSlot={slot}
          mode={mode}
          onPlayerSelect={() => onPlayerSelect(slot)}
          onGroupSelect={() => onGroupSelect(slot.registrationId)}
          onOpenSelect={() => onMoveConfirm(group)}
        />
      ))}
    </div>
  )
}

export { ReserveRowAdmin }
