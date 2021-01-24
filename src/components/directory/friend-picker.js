import React from "react"

import { useFriends } from "hooks/account-hooks"
import * as colors from "styles/colors"

function FriendPicker({ alreadyRegistered, onSelect }) {
  const friends = useFriends()
  const isRegistered = (friend) => {
    return alreadyRegistered.some((id) => friend.id === id)
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
            <div className="list-group">
              {friends.map((f) => {
                return (
                  <button
                    className="list-group-item list-group-item-action"
                    disabled={isRegistered(f)}
                    onClick={() => onSelect(f)}
                    key={f.id}
                  >
                    {f.name}
                    {isRegistered(f) && (
                      <span className="text-primary" style={{ fontSize: ".8rem" }}>
                        registered
                      </span>
                    )}
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
