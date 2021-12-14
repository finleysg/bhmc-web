import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useAuth } from "context/auth-context"
import { useBoardMembers } from "hooks/player-hooks"
import { Link } from "react-router-dom"

function Officer(props) {
  const { officer } = props
  const { user } = useAuth()

  return (
    <div>
      <h6>{officer.role}</h6>
      <p style={{ marginBottom: ".5rem" }}>
        {user?.is_authenticated ? (
          <Link className="text-success" to={`/directory/${officer.player.id}`}>
            {officer.player.first_name} {officer.player.last_name} <span>({officer.term_expires})</span>
          </Link>
        ) : (
          <React.Fragment>
            {officer.player.first_name} {officer.player.last_name} <span>({officer.term_expires})</span>
          </React.Fragment>
        )}
      </p>
      <p>
        <a href={`mailto: ${officer.role.toLowerCase().replace(" ", "-")}@bhmc.org`}>
          {officer.role.toLowerCase().replace(" ", "-")}@bhmc.org
        </a>
      </p>
    </div>
  )
}

function BoardMember(props) {
  const { boardMember } = props
  const { user } = useAuth()

  if (user?.is_authenticated) {
    return (
      <p>
        <Link className="text-success" to={`/directory/${boardMember.player.id}`}>
          {boardMember.player.first_name} {boardMember.player.last_name}{" "}
          <span>({boardMember.term_expires ? boardMember.term_expires : "Honorary"})</span>
        </Link>
      </p>
    )
  } else {
    return (
      <p>
        {boardMember.player.first_name} {boardMember.player.last_name}{" "}
        <span>({boardMember.term_expires ? boardMember.term_expires : "Honorary"})</span>
      </p>
    )
  }
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
