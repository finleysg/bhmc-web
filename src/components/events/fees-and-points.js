function FeesAndPoints({ clubEvent, openings }) {
  const showAvailableSpots =
    clubEvent.registrationType !== "None" &&
    clubEvent.registrationWindow !== "past" &&
    clubEvent.startType !== "Not Applicable"

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">Fees and Points</h5>
        <div className="fees-points">
          {clubEvent.fees.map((eventFee) => {
            return (
              <div key={eventFee.id} className="fees-points-item">
                <span className="label">{eventFee.name}</span>
                <span className="value">${eventFee.amount.toFixed(2)}</span>
              </div>
            )
          })}
          <div className="fees-points-item" style={{ marginTop: "1rem" }}>
            <span className="label">Season long points</span>
            <span className="value">{clubEvent.seasonPoints ?? 0}</span>
          </div>
          <div className="fees-points-item">
            <span className="label">Group size</span>
            <span className="value">{clubEvent.groupSize ?? "N/A"}</span>
          </div>
          {showAvailableSpots && (
            <div className="fees-points-item">
              <span className="label">Spots available</span>
              <span className="value">{openings}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeesAndPoints
