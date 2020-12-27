import { useClient } from "context/auth-context"
import { ClubEvent, loadingEvent } from "models/club-event"
import { Registration, RegistrationSlot } from "models/registration"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

function useClubEvents() {
  const client = useClient()
  return useQuery(
    "club-events",
    () =>
      client(`events/?season=${config.currentSeason}`).then((data) =>
        data.map((e) => new ClubEvent(e)),
      ),
    {
      cacheTime: Infinity,
    },
  )
}

function useClubEvent({ eventId, eventDate, eventName }) {
  const { data } = useClubEvents()
  if (!eventId) {
    return (
      data?.find((ce) => ce.slugDate === eventDate && ce.slugName === eventName) ?? loadingEvent
    )
  }
  return data?.find((e) => e.id === eventId) ?? loadingEvent
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
  const { data: clubEvents } = useClubEvents()
  const clubEvent =
    (clubEvents &&
      clubEvents.length > 0 &&
      clubEvents.find((ce) => ce.slugDate === eventDate && ce.slugName === eventName)) ??
    loadingEvent
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
      cacheTime: 1000 * 60 * 60,
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
