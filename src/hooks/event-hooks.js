import { useClient } from "context/auth-context"
import { ClubEvent, loadingEvent } from "models/club-event"
import { RegistrationSlot } from "models/registration"
import { useQuery } from "react-query"

function useClubEvent(eventId) {
  const client = useClient()
  const { data } = useQuery({
    queryKey: ["club-event", { eventId }],
    queryFn: () => client(`events/${eventId}/`).then((data) => new ClubEvent(data)),
    config: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  })

  return data ?? loadingEvent
}

function useEventRegistrationSlots(eventId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery({
    queryKey: ["event-registration-slots", { eventId }],
    queryFn: () =>
      client(`registration-slots/?event_id=${eventId}`).then((data) => {
        return data.map((slot) => new RegistrationSlot(slot))
      }),
    config: {
      staleTime: 1000 * 15,
      cacheTime: 1000 * 15,
    },
  })

  return registrationSlots ?? []
}

function usePlayerRegistrationSlots(playerId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery({
    queryKey: ["player-registration-slots", { playerId }],
    queryFn: () =>
      client(`registration-slots/?player_id=${playerId}`).then((data) => {
        return data.map((slot) => new RegistrationSlot(slot))
      }),
    config: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  })

  return registrationSlots ?? []
}

export { useClubEvent, useEventRegistrationSlots, usePlayerRegistrationSlots }
