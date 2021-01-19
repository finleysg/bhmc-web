import { ReserveCard } from "./reserve-card"

function ReserveRow({ courseName, group, onSelect, onReserve, ...rest }) {
  return (
    <div className={`reserve-group reserve-group__${courseName.toLowerCase()}`} {...rest}>
      <div className="reserve-group-name">
        <span>{group.name}</span>
        <button
          className="btn btn-sm btn-warning"
          disabled={group.isDisabled()}
          onClick={onReserve}
        >
          Register
        </button>
        <button
          className="btn btn-sm btn-success"
          disabled={!group.hasOpenings()}
          onClick={() => onSelect(group.slots)}
        >
          Select
        </button>
      </div>
      {group.slots.map((slot) => (
        <ReserveCard key={slot.id} reserveSlot={slot} onSelect={(slot) => onSelect([slot])} />
      ))}
    </div>
  )
}

export { ReserveRow }
