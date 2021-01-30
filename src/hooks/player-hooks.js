import React from "react"

import { useClient } from "context/auth-context"
import Player from "models/player"
import { useQuery } from "react-query"
import { client } from "utils/api-client"
import * as config from "utils/app-config"
import { useAsync } from "utils/use-async"

function usePlayers() {
  const client = useClient()
  const { data: players } = useQuery(
    ["players"],
    () => client("players").then((data) => data.map((p) => new Player(p))),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
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
      cacheTime: 1000 * 60 * 15,
      staleTime: 1000 * 60 * 15,
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
      staleTime: Infinity,
    },
  )

  return player ?? new Player({ last_name: "loading..." })
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

function usePlayerSearch(initialQuery) {
  const [query, setQuery] = React.useState(initialQuery)
  const { data, status, error, run, setData } = useAsync()

  const search = React.useCallback(async () => {
    const results = await client(`players/?pattern=${query}`)
    setData(results)
  }, [query, setData])

  React.useEffect(() => {
    const appDataPromise = search()
    run(appDataPromise)
  }, [run, search])

  return { data, status, error, setQuery }
}

export {
  useAces,
  useBoardMembers,
  useChampions,
  useLowScores,
  useMembers,
  usePlayer,
  usePlayerAces,
  usePlayerChampionships,
  usePlayerLowScores,
  usePlayers,
  usePlayerSearch,
}
