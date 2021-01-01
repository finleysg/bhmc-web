import { useClient } from "context/auth-context"
import Player from "models/player"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

function usePlayers() {
  const client = useClient()
  const { data: players } = useQuery(
    ["players"],
    () => client("players").then((data) => data.map((p) => new Player(p))),
    {
      cacheTime: Infinity,
    },
  )

  return players ?? []
}

function useMembers() {
  const client = useClient()
  const eventId = config.seasonEventId

  const { data: members } = useQuery(
    ["members"],
    () => client(`players/?event_id=${eventId}`).then((data) => data.map((p) => new Player(p))),
    {
      cacheTime: 1000 * 60 * 5,
    },
  )

  return members ?? []
}

function usePlayer(playerId) {
  const client = useClient()
  const { data: player } = useQuery(
    ["players", playerId],
    () => client(`players/${playerId}`).then((data) => new Player(data)),
    {
      cacheTime: Infinity,
    },
  )

  return player ?? new Player({ last_name: "loading..." })
}

function useBoardMembers() {
  const client = useClient()
  const { data: boardMembers } = useQuery(["board"], () => client("board").then((data) => data), {
    cacheTime: Infinity,
  })

  return boardMembers ?? []
}

export { useBoardMembers, useMembers, usePlayer, usePlayers }
