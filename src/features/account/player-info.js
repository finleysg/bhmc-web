import React from "react"

// import { ErrorDisplay } from "components/errors"
// import { LoadingSpinner } from "components/spinners"
import { MdEdit, MdPerson } from "react-icons/md"

import { usePlayer } from "./account-hooks"
import { PlayerForm } from "./player-form"

function PlayerInfo() {
  const [mode, setMode] = React.useState("view")
  const player = usePlayer()

  return (
    <div className="pmb-block">
      <div className="pmbb-header">
        <h2>
          <MdPerson /> Player Profile
        </h2>
        <ul className="actions">
          <li>
            <button
              onClick={() => setMode("edit")}
              className={`actions__item bg-transparent`}
              title="Update your player profile"
            >
              <i>
                <MdEdit />
              </i>
            </button>
          </li>
        </ul>
      </div>
      {/* <LoadingSpinner loading={isLoading} />
      <ErrorDisplay isError={isError} error={error} /> */}
      {mode === "view" && (
        <div style={{ paddingLeft: "30px" }}>
          <dl className="dl-horizontal">
            <dt>Full Name</dt>
            <dd>{player.name}</dd>
          </dl>
          <dl className="dl-horizontal">
            <dt>Email</dt>
            <dd>{player.email}</dd>
          </dl>
          <dl className="dl-horizontal">
            <dt>GHIN</dt>
            <dd>{player.ghin}</dd>
          </dl>
          <dl className="dl-horizontal">
            <dt>Age</dt>
            <dd>{player.age}</dd>
          </dl>
          <dl className="dl-horizontal">
            <dt>Phone Number</dt>
            <dd>{player.phoneNumber}</dd>
          </dl>
          <dl className="dl-horizontal">
            <dt>Tee</dt>
            <dd>{player.tee}</dd>
          </dl>
        </div>
      )}
      {mode === "edit" && <PlayerForm player={player.obj} onClose={() => setMode("view")} />}
    </div>
  )
}

export { PlayerInfo }
