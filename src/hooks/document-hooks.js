import { useClient } from "context/auth-context"
import BhmcDocument from "models/document"
import { useQuery } from "react-query"

function useEventDocuments(eventId) {
  const client = useClient()
  const hasEventId = eventId !== undefined
  const { data: documents } = useQuery(
    ["documents", eventId],
    () => client(`documents/?event_id=${eventId}`).then((data) => data),
    {
      enabled: hasEventId,
      cacheTime: Infinity,
    },
  )
  return documents ?? []
}

function useDocuments(documentType, year) {
  const client = useClient()

  const { data: documents } = useQuery(
    ["documents", documentType, year],
    () =>
      client(`documents/?type=${documentType}&year=${year}`).then((data) => {
        if (data && data.length > 0) {
          return data.map((doc) => new BhmcDocument(doc))
        }
        return []
      }),
    {
      cacheTime: Infinity,
    },
  )

  return documents ?? []
}

export { useDocuments, useEventDocuments }
