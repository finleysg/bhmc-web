import { useClient } from "context/auth-context"
import {
  useMutation,
  useQueryClient,
} from "react-query"
import { toast } from "react-toastify"

function useEventPatch() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    (partial) => {
      return client(`events/${partial.id}/`, {
        method: "PATCH",
        data: partial,
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to update the event.")
      },
      onSuccess: () => {
        queryClient.invalidateQueries("club-events")
        toast.success("⛳ The event has been updated.")
      },
    },
  )
}

function useMovePlayers() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    ({ registrationId, sourceSlotIds, destinationSlotIds }) => {
      return client(`registration/${registrationId}/move/`, {
        method: "PUT",
        data: {
          source_slots: sourceSlotIds,
          destination_slots: destinationSlotIds,
        },
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to move player(s).")
      },
      onSuccess: () => {
        queryClient.invalidateQueries("event-registration-slots")
        toast.success("⛳ Player or players have been moved.")
      },
    },
  )
}

export { useEventPatch, useMovePlayers }
