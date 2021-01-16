import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

function usePhotos({ season, tags }) {
  const client = useClient()

  const getUrl = () => {
    if (Boolean(season)) {
      if (Boolean(tags)) {
        return `photos/?year=${season}&tags=${tags.join(",")}`
      } else {
        return `photos/?year=${season}}`
      }
    } else {
      if (Boolean(tags)) {
        return `photos/?tags=${tags.join(",")}`
      } else {
        throw new Error("cannot return all photos")
      }
    }
  }
  const url = getUrl()

  const { data: photos } = useQuery(
    ["photos", url],
    () =>
      client(url).then((data) => {
        if (data && data.length > 0) {
          return data.map((pic) => pic)
        }
        return []
      }),
    {
      cacheTime: Infinity,
    },
  )

  return photos ?? []
}

export { usePhotos }
