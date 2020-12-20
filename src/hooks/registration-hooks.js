import { useClient } from "context/auth-context"
import Player from "models/player"
import { useQuery } from "react-query"

// TODO: only eligible players for a given event
function usePlayers() {
  const client = useClient()
  const { data: players } = useQuery(
    ["players"],
    () => client("players").then((data) => data.map((p) => new Player(p))),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  )

  return players ?? []
}

export { usePlayers }
