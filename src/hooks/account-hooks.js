import { useAuth, useClient } from "context/auth-context"
import { SavedCard } from "models/payment"
import Player from "models/player"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

function usePlayer() {
  const { user } = useAuth()
  const client = useClient()
  const queryClient = useQueryClient()

  const { data: player } = useQuery(
    "player",
    () => {
      return client(`players/?email=${user.email}`).then((data) => {
        return data[0]
      })
    },
    {
      initialData: () => {
        return queryClient.getQueryData("player")
      },
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    },
  )

  return new Player(player ?? {})
}

function useMyEvents() {
  const player = usePlayer()
  const client = useClient()

  const { data: myEvents } = useQuery("my-events", () => {
    return client(`registration-slots/?player_id=${player.id}`).then(
      (data) => {
        if (data) return data.filter((s) => s.status === "R").map((s) => s.event)
        return []
      },
      {
        enabled: player?.id !== undefined,
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
      },
    )
  })
  return myEvents
}

function useMyCards() {
  const client = useClient()

  const { data: myCards } = useQuery("my-cards", () => {
    return client("saved-cards").then((obj) => {
      if (obj.data) return obj.data.map((c) => new SavedCard(c))
      return []
    })
  })
  return myCards
}

function useUpdatePlayer() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    (updates) => {
      // If I don't return the promise, onError and onSuccess don't work
      // as expected.
      return client(`players/${updates.id}/`, {
        method: "PUT",
        data: updates,
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap!")
      },
      onSuccess: (data) => {
        queryClient.setQueryData("player", data)
      },
    },
  )
}

function usePlayerProfilePic() {
  const formClient = useFormClient()
  const queryClient = useQueryClient()

  return useMutation((formData) => formClient(`photos/`, formData), {
    onError: () => {
      toast.error("💣 Aww, Snap!")
    },
    onSuccess: (data) => {
      const player = queryClient.getQueryData("player")
      player.profile_picture = data
      queryClient.setQueryData("player", player)
    },
  })
}

export { useMyCards, useMyEvents, usePlayer, usePlayerProfilePic, useUpdatePlayer }
