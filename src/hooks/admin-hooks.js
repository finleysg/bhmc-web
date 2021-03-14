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

export { useEventPatch }
