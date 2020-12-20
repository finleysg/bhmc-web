import { useAuth, useClient } from "context/auth-context"
import { SavedCard } from "models/payment"
import Player from "models/player"
import { queryCache, useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

const playerMutationConfig = {
  onError: () => toast.error("💣 Aww, Snap!"),
  onSettled: () => queryCache.invalidateQueries("player"),
}

function usePlayer() {
  const { user } = useAuth()
  const client = useClient()

  const { data: player } = useQuery(
    "player",
    () => {
      return client(`players/?email=${user.email}`).then((data) => {
        return data[0]
      })
    },
    {
      initialData: () => {
        return queryCache.getQueryData("player")
      },
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    },
  )

  return new Player(player ?? {})
}

function useMyEvents() {
  const { player } = usePlayer()
  const client = useClient()

  const { data: myEvents } = useQuery(
    "my-events",
    () => {
      if (player && player.id) {
        return client(`registration-slots/?player_id=${player.id}`).then((slots) => {
          return slots.filter((s) => s.status === "R").map((s) => s.event)
        })
      }
    },
    {
      initialData: () => {
        return queryCache.getQueryData("my-events")
      },
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    },
  )
  return myEvents ?? []
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
      onSuccess: () => {
        queryCache.invalidateQueries("player")
      },
    },
  )
}

function usePlayerProfilePic() {
  const formClient = useFormClient()

  return useMutation((formData) => formClient(`photos/`, formData), playerMutationConfig)
}

export { useMyCards, useMyEvents, usePlayer, usePlayerProfilePic, useUpdatePlayer }
