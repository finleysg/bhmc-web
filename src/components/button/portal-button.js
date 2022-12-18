import * as colors from "styles/colors"

function EventPortalButton({ clubEvent, ...rest }) {
  if (clubEvent?.portalUrl) {
    return (
      <a
        className="btn btn-info btn-sm"
        style={{ color: colors.white }}
        href={clubEvent.portalUrl}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        ⛳ Leaderboard
      </a>
    )
  }
  return null
}

export { EventPortalButton }
