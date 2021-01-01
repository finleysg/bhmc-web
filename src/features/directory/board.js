import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useBoardMembers } from "hooks/player-hooks"
import { Link } from "react-router-dom"

function Officer(props) {
  const { officer } = props

  return (
    <div>
      <h6>{officer.role}</h6>
      <p style={{ marginBottom: ".5rem" }}>
        <Link className="text-success" to={`/directory/${officer.player.id}`}>
          {officer.player.first_name} {officer.player.last_name}{" "}
          <span>({officer.term_expires})</span>
        </Link>
      </p>
      <p>
        <a href={`mailto: ${officer.player.email}`}>{officer.player.email}</a>
      </p>
    </div>
  )
}

function BoardMember(props) {
  const { boardMember } = props

  return (
    <p>
      <Link className="text-success" to={`/directory/${boardMember.player.id}`}>
        {boardMember.player.first_name} {boardMember.player.last_name}{" "}
        <span>({boardMember.term_expires ? boardMember.term_expires : "Honorary"})</span>
      </Link>
    </p>
  )
}

function Officers() {
  const boardMembers = useBoardMembers()

  if (boardMembers && boardMembers.length > 0) {
    return (
      <div>
        {boardMembers
          .filter((m) => !m.role.startsWith("Director"))
          .map((m) => (
            <Officer key={m.player.id} officer={m} />
          ))}
      </div>
    )
  } else {
    return <LoadingSpinner loading={true} offset="60px" />
  }
}

function Board() {
  const boardMembers = useBoardMembers()

  return (
    <div>
      {boardMembers &&
        boardMembers
          .filter((m) => m.role.startsWith("Director"))
          .map((m) => <BoardMember key={m.player.id} boardMember={m} />)}
    </div>
  )
}

export { Board, BoardMember, Officer, Officers }
