import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

const defaultSettings = {
  currentSeason: new Date().getFullYear(),
  previousSeasonEventId: 0,
  seasonEventId: 0,
  seasonMatchPlayId: 0,
}

function useSettings() {
  const client = useClient()
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      client("settings").then((data) => {
        if (data && data.length > 0) {
          const activeSeason = data.find((d) => d.is_active)
          const previousSeason = data.find((d) => d.season === activeSeason.season - 1)
          return {
            currentSeason: +activeSeason.season,
            previousSeasonEventId: +(previousSeason?.member_event || 0),
            seasonEventId: +activeSeason.member_event,
            seasonMatchPlayId: +activeSeason.match_play_event,
          }
        }
        return undefined
      }),
    config: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  })

  return data ?? defaultSettings
}

export { useSettings }
