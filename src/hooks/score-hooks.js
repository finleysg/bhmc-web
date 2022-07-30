import { useClient } from "context/auth-context"
import { Course, Score } from "models/round"
import { useQuery } from "react-query"

function useCourses() {
  const client = useClient()
  const { data: courses } = useQuery(
    ["courses"],
    () => client("courses").then((data) => data.map((c) => new Course(c))),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return courses ?? []
}

function usePlayerScores(season, playerId, isNet) {
  const client = useClient()

  const { data, status } = useQuery(
    ["scores", season, playerId, isNet],
    () =>
      client(`scores/?season=${season}&player_id=${playerId}&is_net=${isNet}`).then((data) =>
        data.map((s) => new Score(s)),
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return { scores: data ?? [], status }
}

export { useCourses, usePlayerScores }
