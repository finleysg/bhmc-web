import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useBoardMembers, useMembers, usePlayer } from "hooks/player-hooks"
import { MdPerson } from "react-icons/md"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

import defaultProfilePic from "../../assets/img/unknown.jpg"

function PlayerProfile({ playerId }) {
  const player = usePlayer(playerId)
  const members = useMembers()
  const boardMembers = useBoardMembers()

  const isMember = members.findIndex((m) => m.id === playerId) >= 0
  const boardMember = boardMembers.find((m) => m.player.id === playerId)

  if (player) {
    return (
      <div
        className={`card border border-${isMember ? "green" : "blue"}`}
        style={{ margin: "auto", maxWidth: "600px" }}
      >
        <div
          className={`card-header bg-${isMember ? "green" : "blue"}`}
          style={{ display: "flex" }}
        >
          <div style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem", flex: 1 }}>
            <MdPerson style={{ fontSize: "2rem" }} />
            <span style={{ marginLeft: "10px" }}>{player.name}</span>
          </div>
          <div style={{ color: colors.white, fontSize: "1rem" }}>
            {boardMember && <span>{boardMember.role}</span>}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 col-12" style={{ marginBottom: "20px" }}>
              <div>
                {player.imageUrl() ? (
                  <picture>
                    <source srcSet={player.mobileImageUrl()} media="(max-width: 600px)" />
                    <source srcSet={player.webImageUrl()} media="(max-width: 1200px)" />
                    <img
                      src={player.imageUrl()}
                      style={{ maxWidth: "100%", height: "auto", display: "block", margin: "auto" }}
                      alt="Profile"
                    />
                  </picture>
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
              {boardMember && (
                <h6 className="text-indigo" style={{ marginBottom: "10px" }}>
                  ⭐ Board Member
                </h6>
              )}
              {isMember && <h6 className="text-teal">🏌️‍♂️ {config.currentSeason} Member</h6>}
              {/* TODO: Add champion badge 🏆 */}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <LoadingSpinner loading={true} />
  }
}

export { PlayerProfile }
