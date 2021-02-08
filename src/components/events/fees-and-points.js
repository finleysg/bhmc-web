function FeesAndPoints({ clubEvent, openings }) {
  const showAvailableSpots =
    clubEvent.registrationType !== "None" && clubEvent.registrationWindow !== "past"

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">Fees and Points</h5>
        <div className="card-text">
          {clubEvent.fees.map((eventFee) => {
            return (
              <p key={eventFee.id} style={{ marginBottom: ".5rem" }}>
                <strong>{eventFee.name}:</strong> ${eventFee.amount.toFixed(2)}
              </p>
            )
          })}
          <p style={{ marginTop: "1rem" }}>
            <strong>Group size:</strong> {clubEvent.groupSize ?? "N/A"}
          </p>
          <p>
            <strong>Season long points:</strong> {clubEvent.seasonPoints ?? 0}
          </p>
          {showAvailableSpots && (
            <p style={{ marginTop: "1rem" }}>
              <strong>Spots available:</strong> {openings}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeesAndPoints
