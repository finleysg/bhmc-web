import { useClient } from "context/auth-context"
import { ClubEvent, loadingEvent } from "models/club-event"
import { Registration, RegistrationSlot } from "models/registration"
import { useMutation, useQuery } from "react-query"

import { useSettings } from "./use-settings"

function useClubEvents(year) {
  const { currentSeason } = useSettings()
  const client = useClient()
  const season = !year ? currentSeason : year
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

function useCopyEvent() {
  const client = useClient()

  return useMutation(({ eventId, startDate }) => {
    return client(`copy-event/${eventId}/?start_dt=${startDate}`, {
      method: "POST",
    })
  })
}

function useEventRegistrations(eventId) {
  const client = useClient()

  const { data: registrations } = useQuery(
    ["event-registrations", eventId],
    () =>
      client(`registration/?event_id=${eventId}`).then((data) => {
        return data
          .map((reg) => new Registration(reg))
          .filter((r) => r.slots.length > 0 && r.slots[0].status === "R")
      }),
    {
      enabled: !!eventId,
      cacheTime: 1000 * 60 * 5,
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

  return useQuery(
    ["event-registration-slots", eventId],
    () => client(`registration-slots/?event_id=${eventId}`).then((data) => data),
    {
      enabled: !!eventId,
      // refetchInterval: 1000 * 30,
      cacheTime: 1000 * 60 * 5,
    },
  )
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
  useClubEvents,
  useCopyEvent,
  useEventRegistrations,
  useEventRegistrationSlots,
  useEventWithRegistrations,
  usePlayerRegistrations,
  usePlayerRegistrationSlots,
}
