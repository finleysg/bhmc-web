import { useClient } from "context/auth-context"
import { queryCache, useQuery } from "react-query"

const loadingEvent = {
  name: "Loading...",
  description: "loading...",
  loadingEvent: true,
}

const eventQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const getCalendarMonthConfig = (client, year, month) => ({
  queryKey: ["events", { year, month }],
  queryFn: () => client(`events/?year=${year}&month=${month}`).then((data) => data.events),
  config: {
    onSuccess(events) {
      for (const evt of events) {
        queryCache.setQueryData(["event", { eventId: evt.id }], evt, eventQueryConfig)
      }
    },
  },
})

function useClubEvents(year, month) {
  const client = useClient()
  const result = useQuery(getCalendarMonthConfig(client, year, month))
  return { ...result, events: result.data ?? [] }
}

function useClubEvent(eventId) {
  const client = useClient()
  const { data } = useQuery({
    queryKey: ["event", { eventId }],
    queryFn: () => client(`events/${eventId}`).then((data) => data.event),
    ...eventQueryConfig,
  })
  return data ?? loadingEvent
}

// function setQueryDataForBook(book) {
//   queryCache.setQueryData({
//     queryKey: ['book', {bookId: book.id}],
//     queryFn: book,
//     ...bookQueryConfig,
//   })
// }
export { useClubEvent, useClubEvents }
