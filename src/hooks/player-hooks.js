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
  const players = usePlayers()
  const player = players.find((p) => p.id === playerId)
  return player
}

export { useMembers, usePlayer, usePlayers }
