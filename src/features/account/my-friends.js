import React from "react"

import { CardContent } from "components/content"
import { PlayerRow } from "features/directory/search"
import { useFriends } from "hooks/account-hooks"

function MyFriends(props) {
  const friends = useFriends()

  return (
    <CardContent contentKey="my-friends">
      <React.Fragment>
        {friends.map((player) => {
          return <PlayerRow key={player.id} player={player} onSelect={props.onSelect} />
        })}
      </React.Fragment>
    </CardContent>
  )
}

export { MyFriends }
