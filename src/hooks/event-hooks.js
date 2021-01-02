import { useClient } from "context/auth-context"
import { ClubEvent, loadingEvent } from "models/club-event"
import { Registration, RegistrationSlot } from "models/registration"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

function useClubEvents(year) {
  const client = useClient()
  const season = !year ? config.currentSeason : year
  const { data: events } = useQuery(
    ["club-events", season],
    () => client(`events/?season=${season}`).then((data) => data.map((e) => new ClubEvent(e))),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  )

  return events ?? []
}

function useClubEvent({ eventId, eventDate, eventName, season }) {
  const events = useClubEvents(season)
  if (!eventId) {
    return (
      events.find((ce) => ce.slugDate === eventDate && ce.slugName === eventName) ?? loadingEvent
    )
  }
  return events.find((e) => e.id === eventId) ?? loadingEvent
}

function useEventRegistrations(eventId) {
  const client = useClient()

  const { data: registrations } = useQuery(
    ["event-registrations", eventId],
    () =>
      client(`registration/?event_id=${eventId}`).then((data) => {
        return data.map((reg) => new Registration(reg))
      }),
    {
      enabled: !!eventId,
      refetchInterval: 1000 * 15,
      cacheTime: 1000 * 60,
    },
  )

  return registrations ?? []
}

function useEventWithRegistrations({ eventDate, eventName }) {
  const events = useClubEvents()
  const clubEvent =
    events.find((ce) => ce.slugDate === eventDate && ce.slugName === eventName) ?? loadingEvent
  const registrations = useEventRegistrations(clubEvent?.id)
  return {
    clubEvent,
    registrations,
  }
}

function useEventRegistrationSlots(eventId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery(["event-registration-slots", eventId], () =>
    client(`registration-slots/?event_id=${eventId}`).then((data) => {
      return data.map((slot) => new RegistrationSlot(slot))
    }),
  )

  return registrationSlots ?? []
}

function usePlayerRegistrations(playerId) {
  const client = useClient()

  const { data: registrations } = useQuery(["player-registrations", playerId], () =>
    client(`registration/?player_id=${playerId}`).then((data) => {
      return data.map((reg) => new Registration(reg))
    }),
  )

  return registrations ?? []
}

function usePlayerRegistrationSlots(playerId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery(
    ["player-registration-slots", playerId],
    () =>
      client(`registration-slots/?player_id=${playerId}`).then((data) => {
        return data.map((slot) => new RegistrationSlot(slot))
      }),
    {
      cacheTime: 1000 * 60 * 15,
      staleTime: 1000 * 60 * 15,
    },
  )

  return registrationSlots ?? []
}

export {
  useClubEvent,
  useClubEvents,
  useEventRegistrations,
  useEventRegistrationSlots,
  useEventWithRegistrations,
  usePlayerRegistrations,
  usePlayerRegistrationSlots,
}
