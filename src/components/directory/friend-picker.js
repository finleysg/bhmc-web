import React from "react"

import { useFriends } from "hooks/account-hooks"
import * as colors from "styles/colors"

import FriendCard from "./friend-card"

function FriendPicker({ slots, onSelect }) {
  const friends = useFriends()
  const isRegistered = (friend) => {
    return slots.some((slot) => friend.id === slot?.player?.id)
  }

  return (
    <div className="card card border border-primary">
      <div className="card-header bg-primary">
        <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
          Friends
        </span>
      </div>
      <div className="card-body">
        {Boolean(friends?.length) || (
          <p>
            You don't currently have any members in your Friends list. Anyone you sign up for an
            event will automatically be added to your Friends list.
          </p>
        )}
        {Boolean(friends?.length) && (
          <React.Fragment>
            {friends.map((f) => {
              return (
                <FriendCard
                  key={f.id}
                  friend={f}
                  registered={isRegistered(f)}
                  onSelect={onSelect}
                />
              )
            })}
            <p>Anyone you sign up for an event will automatically be added to your Friends list.</p>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default FriendPicker
