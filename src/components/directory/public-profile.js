/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"

import React from "react"

import clsx from "clsx"
import { OverlaySpinner } from "components/spinners"
import {
  useBoardMembers,
  usePlayer,
  usePlayerChampionships,
  usePlayerEvents,
} from "hooks/player-hooks"
import { MdPerson } from "react-icons/md"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

import defaultProfilePic from "../../assets/img/unknown.jpg"

function ProfileImage({ player }) {
  const profileCss = { maxWidth: "100%", height: "auto", display: "block", margin: "auto" }

  if (player.imageUrl()) {
    return (
      <div style={{ position: "relative" }}>
        <picture>
          <source srcSet={player.mobileImageUrl()} media="(max-width: 600px)" />
          <source srcSet={player.webImageUrl()} media="(max-width: 1200px)" />
          <img className="img-responsive" src={player.imageUrl()} css={profileCss} alt="Profile" />
        </picture>
      </div>
    )
  }
  return <img className="img-responsive" css={profileCss} src={defaultProfilePic} alt="Profile" />
}

function PlayerDetail({ label, children }) {
  return (
    <p style={{ marginBottom: "1rem" }}>
      <span style={{ fontWeight: "bold" }}>{label}:</span> {children}
    </p>
  )
}

function MemberBadge({ isMember }) {
  if (isMember) {
    return (
      <h6 className="text-teal" style={{ marginBottom: "1rem" }}>
        🏌️‍♂️ {config.currentSeason} Member
      </h6>
    )
  }
  return null
}

function BoardBadge({ boardMember }) {
  if (boardMember) {
    return (
      <h6 className="text-light-blue" style={{ marginBottom: "1rem" }}>
        ⭐ Board Member
      </h6>
    )
  }
  return null
}

function ChampionshipBadges({ championships }) {
  return (
    <React.Fragment>
      {championships
        .filter((c) => c.season >= config.currentSeason - 1)
        .map((c) => (
          <h6 key={c.id} className="text-indigo" style={{ marginBottom: ".8rem" }}>
            🏆 {c.season} {c.event_name}
          </h6>
        ))}
    </React.Fragment>
  )
}

function PlayerProfile({ playerId }) {
  const player = usePlayer(playerId)
  const events = usePlayerEvents(playerId)
  const boardMembers = useBoardMembers()
  const championships = usePlayerChampionships(playerId)

  const isMember = events.indexOf(config.seasonEventId) >= 0
  const boardMember = boardMembers.find((m) => m.player.id === playerId)

  const cardBorder = clsx({
    card: true,
    border: true,
    "border-green": isMember,
    "border-blue": !isMember,
  })

  const cardHeader = clsx({
    "card-header": true,
    "bg-green": isMember,
    "bg-blue": !isMember,
  })

  return (
    <div className={cardBorder} style={{ margin: "auto", maxWidth: "600px" }}>
      <OverlaySpinner loading={player.id === 0} />
      <div className={cardHeader} style={{ display: "flex" }}>
        <div style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem", flex: 1 }}>
          <MdPerson style={{ fontSize: "2rem", marginRight: "1rem" }} />
          <span>{player.name}</span>
        </div>
        <div style={{ color: colors.white, fontSize: "1rem" }}>
          {boardMember && <span>{boardMember.role}</span>}
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6 col-12" style={{ marginBottom: "20px" }}>
            <ProfileImage player={player} />
          </div>
          <div className="col-sm-6 col-12">
            <PlayerDetail label="Email">
              <a href={`mailto: ${player.email}`}>{player.email}</a>
            </PlayerDetail>
            <PlayerDetail label="Phone">
              <a href={`tel: ${player.phoneNumber}`}>{player.phoneNumber}</a>
            </PlayerDetail>
            <PlayerDetail label="Tees">{player.tee}</PlayerDetail>
            <BoardBadge boardMember={boardMember} />
            <MemberBadge isMember={isMember} />
            <ChampionshipBadges championships={championships} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { PlayerProfile }
