import { useClient } from "context/auth-context"
import { ClubEvent, loadingEvent } from "models/club-event"
import { RegistrationSlot } from "models/registration"
import { useQuery } from "react-query"
import * as config from "utils/app-config"

function useClubEvents() {
  const client = useClient()
  return useQuery({
    queryKey: "club-events",
    queryFn: () =>
      client(`events/?year=${config.currentSeason}`).then((data) =>
        data.map((e) => new ClubEvent(e)),
      ),
    config: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  })
}

function useClubEvent(eventId) {
  const { data } = useClubEvents()
  return data.find((e) => e.id === eventId) ?? loadingEvent
}

function useEventRegistrationSlots(eventId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery({
    queryKey: ["event-registration-slots", eventId],
    queryFn: () =>
      client(`registration-slots/?event_id=${eventId}`).then((data) => {
        return data.map((slot) => new RegistrationSlot(slot))
      }),
    // config: {
    //   staleTime: 1000 * 15,
    //   cacheTime: 1000 * 15,
    // },
  })

  return registrationSlots ?? []
}

function usePlayerRegistrationSlots(playerId) {
  const client = useClient()

  const { data: registrationSlots } = useQuery({
    queryKey: ["player-registration-slots", playerId],
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

export { useClubEvent, useClubEvents, useEventRegistrationSlots, usePlayerRegistrationSlots }
