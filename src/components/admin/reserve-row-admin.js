import { ReserveCardAdmin } from "./reserve-card-admin"

function ReserveRowAdmin({
  courseName,
  group,
  mode,
  onPlayerSelect,
  onGroupSelect,
  onDrop,
  onMove,
  onMoveConfirm,
  ...rest
}) {
  const disableActions = () => {
    return group.selectedSlotIds().length === 0
  }

  return (
    <div className={`reserve-group reserve-group__${courseName.toLowerCase()}`} {...rest}>
      <div className="reserve-group-name">
        <span>{group.name}</span>
        <button
          className="btn btn-sm btn-primary"
          disabled={disableActions()}
          onClick={() => onMove(group.selectedSlotIds())}
        >
          {mode === "select" ? "Move" : "Cancel"}
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
