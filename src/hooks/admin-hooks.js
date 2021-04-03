import React from "react"

import { useClient } from "context/auth-context"
import { useMutation, useQuery, useQueryClient } from "react-query"
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

function useDropPlayers() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    ({ registrationId, slotIds }) => {
      return client(`registration/${registrationId}/drop/`, {
        method: "DELETE",
        data: {
          source_slots: slotIds,
        },
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to drop player(s).")
      },
      onSuccess: () => {
        queryClient.invalidateQueries("event-registrations")
        queryClient.invalidateQueries("event-registration-slots")
        toast.success("⛳ Player or players have been dropped.")
      },
    },
  )
}

function useIssueRefunds() {
  const client = useClient()
  return React.useCallback(
    (refunds) => {
      const posts = []
      refunds.forEach((refund) => {
        if (refund.refund_amount > 0) {
          posts.push(client("refunds", { data: refund }))
        }
      })

      if (posts.length > 0) {
        return Promise.all(posts)
      } else {
        return Promise.resolve()
      }
    },
    [client],
  )
}

function usePoints(eventId, documentId) {
  const client = useClient()

  return useQuery(["season-long-points", documentId], () => {
    return client(`season-long-points/?event_id=${eventId}&document_id=${documentId}`).then(
      (data) => {
        if (data) return data.map((c) => c)
        return []
      },
    )
  })
}

function usePointsImport() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    ({ eventId, documentId }) => {
      return client(`import-points`, {
        method: "POST",
        data: {
          event_id: eventId,
          document_id: documentId,
        },
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to import points from the selected file.")
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["season-long-points", variables.documentId])
        toast.success("⛳ Points have been imported.")
      },
    },
  )
}

export {
  useDropPlayers,
  useEventPatch,
  useIssueRefunds,
  useMovePlayers,
  usePoints,
  usePointsImport,
}
