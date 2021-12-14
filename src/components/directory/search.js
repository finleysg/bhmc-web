import React from "react"

import { Spinner } from "components/spinners"
import { useClient } from "context/auth-context"
import debounceFn from "debounce-fn"
import { useAddFriend, useFriends, useRemoveFriend } from "hooks/account-hooks"
import Player from "models/player"
import { MdStar, MdStarBorder } from "react-icons/md"
import { toast } from "react-toastify"
import * as colors from "styles/colors"

function StarToggle(props) {
  const { player } = props
  const [isFriend, setIsFriend] = React.useState(player.isFriend)
  const { mutate: add, status: addStatus } = useAddFriend()
  const { mutate: remove, status: removeStatus } = useRemoveFriend()
  const loading = addStatus === "loading" || removeStatus === "loading"

  const addFriend = (friend) => {
    add(friend.id, {
      onSuccess: () => {
        toast.success(`${friend.name} added to your friends list`)
        setIsFriend(true)
      },
    })
  }

  const removeFriend = (friend) => {
    remove(friend.id, {
      onSuccess: () => {
        toast.warn(`${friend.name} removed from your friends list`)
        setIsFriend(false)
      },
    })
  }

  const handleClick = () => {
    if (isFriend) {
      removeFriend(player)
    } else {
      addFriend(player)
    }
  }
  return (
    <div
      style={{
        display: "inline-block",
        marginRight: "10px",
        fontSize: "1.5rem",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {loading ? (
        <Spinner style={{ verticalAlign: "middle" }} />
      ) : isFriend ? (
        <MdStar style={{ verticalAlign: "middle", color: colors.yellow }} />
      ) : (
        <MdStarBorder style={{ verticalAlign: "middle" }} />
      )}
    </div>
  )
}

function PlayerRow(props) {
  const { player, onSelect } = props

  const handleSelect = () => {
    onSelect(player)
  }

  return (
    <div style={{ marginBottom: ".5rem" }}>
      <div>
        <StarToggle player={player} />
        <h6
          className="text-success"
          style={{ display: "inline-block", cursor: "pointer", marginRight: "2rem" }}
          onClick={handleSelect}
        >
          {player.name}
        </h6>
        <a href={`mailto:${player.email}`}>{player.email}</a>
      </div>
      {/* <div>
        <a href={`mailto: ${player.email}`}>{player.email}</a>
      </div> */}
    </div>
  )
}

function PlayerSearch(props) {
  const [results, updateResults] = React.useState([])
  const friends = useFriends({ eventId: 0 })
  const client = useClient()

  const searchPlayers = React.useCallback(
    async (pattern) => {
      const results = await client(`player-search/?pattern=${pattern}`)
      const players = results.map((obj) => new Player(obj))
      players.forEach((p) => (p.isFriend = friends.findIndex((f) => f.id === p.id) >= 0))
      updateResults(players)
    },
    [client, friends],
  )

  const doSearch = React.useMemo(() => debounceFn(searchPlayers, { wait: 500 }), [searchPlayers])

  const handleSearch = (e) => {
    const pattern = e.target.value?.toLowerCase()
    if (pattern.length >= 3) {
      doSearch(pattern)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input type="text" className="form-control" placeholder="Search for players..." onChange={handleSearch} />
      </div>
      <div>
        {results.map((player) => {
          return <PlayerRow key={player.id} player={player} onSelect={(player) => props.onSelect(player)} />
        })}
      </div>
    </div>
  )
}

export { PlayerRow, PlayerSearch }
