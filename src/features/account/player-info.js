import React from "react"

import { LoadingSpinner } from "components/spinners"
import { MdEdit, MdPerson } from "react-icons/md"
import { Link } from "react-router-dom"

import { usePlayer } from "../../hooks/account-hooks"
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
      <LoadingSpinner loading={!player.id} offset="20px" />
      {mode === "view" && (
        <div>
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
              <dd>{player.ghin ? player.ghin : "No GHIN"}</dd>
            </dl>
            <dl className="dl-horizontal">
              <dt>Age</dt>
              <dd>{isNaN(player.age) ? "Not given" : player.age}</dd>
            </dl>
            <dl className="dl-horizontal">
              <dt>Phone Number</dt>
              <dd>{player.phoneNumber ? player.phoneNumber : "Not given"}</dd>
            </dl>
            <dl className="dl-horizontal">
              <dt>Tee</dt>
              <dd>{player.tee}</dd>
            </dl>
          </div>
          <div style={{ paddingLeft: "30px", marginTop: "30px" }}>
            <Link to={`/directory/${player.id}`} alt="Public Profile">
              View my public profile
            </Link>
          </div>
        </div>
      )}
      {mode === "edit" && <PlayerForm player={player.obj} onClose={() => setMode("view")} />}
    </div>
  )
}

export { PlayerInfo }
