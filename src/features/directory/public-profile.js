import React from "react"

import { useMembers, usePlayer } from "hooks/player-hooks"
import { MdPerson } from "react-icons/md"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

import defaultProfilePic from "../../assets/img/unknown.jpg"

function PlayerProfile({ playerId }) {
  const player = usePlayer(playerId)
  const members = useMembers()
  const isMember = members.findIndex((m) => m.id === playerId) >= 0

  if (player) {
    return (
      <div
        className={`card border border-${isMember ? "teal" : "blue"}`}
        style={{ margin: "auto" }}
      >
        <div className={`card-header bg-${isMember ? "teal" : "blue"}`}>
          <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
            <MdPerson style={{ fontSize: "2rem" }} />
            <span style={{ marginLeft: "10px" }}>{player.name}</span>
          </span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 col-12" style={{ marginBottom: "20px" }}>
              <div>
                {player.profilePicture() ? (
                  <img
                    style={{ maxWidth: "100%", height: "auto", display: "block", margin: "auto" }}
                    src={player.profilePicture()}
                    alt="Profile"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "100%", height: "auto", display: "block", margin: "auto" }}
                    className="img-responsive"
                    src={defaultProfilePic}
                    alt="Profile"
                  />
                )}
              </div>
            </div>
            <div className="col-sm-6 col-12">
              {isMember && (
                <h6 className="text-teal" style={{ marginBottom: "10px" }}>
                  ⭐ {config.currentSeason} Member
                </h6>
              )}
              <p style={{ marginBottom: "10px" }}>
                <strong>Email:</strong> <a href={`mailto: ${player.email}`}>{player.email}</a>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Phone:</strong>{" "}
                <a href={`tel: ${player.phoneNumber}`}>{player.phoneNumber}</a>
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Tees:</strong> {player.tee}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export { PlayerProfile }
