import { useClient } from "context/auth-context"
import Player from "models/player"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

function usePlayer(playerId) {
  const client = useClient()
  const { data: player } = useQuery(
    ["players", playerId],
    () => client(`players/${playerId}`).then((data) => new Player(data)),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return player ?? new Player({ id: 0, last_name: "loading..." })
}

function usePlayerSearch(eventId, playerId) {
  const client = useClient()
  const { data: player } = useQuery(
    ["players", playerId, eventId],
    () =>
      client(`player-search/?event_id=${eventId}&player_id=${playerId}`).then((data) => {
        if (Boolean(data) && data.length === 1) {
          return new Player(data[0])
        }
        return null
      }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return player ?? new Player({ id: 0, last_name: "loading..." })
}

function usePlayerEvents(playerId) {
  const client = useClient()

  const { data: playerEvents } = useQuery(
    ["player-events", playerId],
    () => {
      return client(
        `registration-slots/?player_id=${playerId}&seasons=${config.currentSeason}&seasons=${
          config.currentSeason - 1
        }`,
      ).then((data) => {
        if (data) return data.filter((s) => s.status === "R").map((s) => s.event)
        return []
      })
    },
    {
      cacheTime: 1000 * 60 * 15,
      staleTime: 1000 * 60 * 15,
    },
  )
  return playerEvents ?? []
}

function useBoardMembers() {
  const client = useClient()
  const { data: boardMembers } = useQuery(["board"], () => client("board").then((data) => data), {
    cacheTime: Infinity,
    staleTime: Infinity,
  })

  return boardMembers ?? []
}

function useChampions(season) {
  const client = useClient()
  const { data: champions } = useQuery(
    ["champions", season],
    () => client(`champions/?season=${season}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return champions ?? []
}

function usePlayerChampionships(playerId) {
  const client = useClient()
  const { data: champions } = useQuery(
    ["champions", playerId],
    () => client(`champions/?player_id=${playerId}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return champions ?? []
}

function useLowScores(season) {
  const client = useClient()
  const { data: lowScores } = useQuery(
    ["low-scores", season],
    () => client(`low-scores/?season=${season}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return lowScores ?? []
}

function usePlayerLowScores(playerId) {
  const client = useClient()
  const { data: lowScores } = useQuery(
    ["low-scores", playerId],
    () => client(`low-scores/?player_id=${playerId}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return lowScores ?? []
}

function useAces(season) {
  const client = useClient()
  const { data: lowScores } = useQuery(
    ["aces", season],
    () => client(`aces/?season=${season}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return lowScores ?? []
}

function usePlayerAces(playerId) {
  const client = useClient()
  const { data: lowScores } = useQuery(
    ["aces", playerId],
    () => client(`aces/?player_id=${playerId}`).then((data) => data),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return lowScores ?? []
}

function useTopPoints(category, topN) {
  const client = useClient()

  return useQuery(
    ["season-long-points", category],
    () =>
      client(`points/${config.currentSeason}/${category.toLowerCase()}/${topN}`).then(
        (data) => data,
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )
}

export {
  useAces,
  useBoardMembers,
  useChampions,
  useLowScores,
  usePlayer,
  usePlayerAces,
  usePlayerChampionships,
  usePlayerEvents,
  usePlayerLowScores,
  usePlayerSearch,
  useTopPoints,
}
