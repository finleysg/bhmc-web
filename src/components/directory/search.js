import React from "react"

import { Spinner } from "components/spinners"
import debounceFn from "debounce-fn"
import { useAddFriend, useFriends, useRemoveFriend } from "hooks/account-hooks"
import { usePlayers } from "hooks/player-hooks"
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
    <div className="row" style={{ marginBottom: "8px" }}>
      <div className="col-lg-6 col-md-12">
        <StarToggle player={player} />
        <h6
          className="text-success"
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={handleSelect}
        >
          {player.name}
        </h6>
      </div>
      <div className="col-lg-6 col-md-12">
        <a href={`mailto: ${player.email}`}>{player.email}</a>
      </div>
    </div>
  )
}

function PlayerSearch(props) {
  const [results, updateResults] = React.useState([])
  const players = usePlayers()
  const friends = useFriends()

  const searchPlayers = React.useCallback(
    (pattern) => {
      const filtered = players.filter((p) => p.name.toLowerCase().includes(pattern))
      filtered.forEach((p) => (p.isFriend = friends.findIndex((f) => f.id === p.id) >= 0))
      updateResults(filtered)
    },
    [players, friends],
  )

  const doSearch = React.useMemo(() => debounceFn(searchPlayers, { wait: 500 }), [searchPlayers])

  const handleSearch = (e) => {
    const pattern = e.target.value?.toLowerCase()
    doSearch(pattern)
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input type="text" className="form-control" placeholder="Search" onChange={handleSearch} />
      </div>
      <div>
        {results.map((player) => {
          return (
            <PlayerRow
              key={player.id}
              player={player}
              onSelect={(player) => props.onSelect(player)}
            />
          )
        })}
      </div>
    </div>
  )
}

export { PlayerRow, PlayerSearch }
