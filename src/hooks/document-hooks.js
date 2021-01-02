import { useClient } from "context/auth-context"
import { Registration } from "models/registration"
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
        return data.map((reg) => new Registration(reg))
      }),
    {
      cacheTime: Infinity,
    },
  )

  return documents ?? []
}

export { useDocuments, useEventDocuments }
