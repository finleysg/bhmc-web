import React from "react"

import { useFriends } from "hooks/account-hooks"

function FriendPicker({ slots, onSelect }) {
  const friends = useFriends()

  const isRegistered = (friend) => {
    return slots.some((slot) => slot?.player.id === friend.id)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Friends</h2>
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
            <div className="list-group">
              {friends.map((f) => {
                return (
                  <button
                    className="list-group-item list-group-item-action"
                    disabled={isRegistered(f)}
                    onClick={() => onSelect(f)}
                  >
                    {f.name}
                    {isRegistered(f) && <span>registered</span>}
                  </button>
                )
              })}
            </div>
            <div>
              <p>
                Anyone you sign up for an event will automatically be added to your Friends list.
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export { FriendPicker }
