import { useAuth, useClient } from "context/auth-context"
import { SavedCard } from "models/payment"
import Player from "models/player"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import * as config from "utils/app-config"
import { useFormClient } from "utils/form-client"

function usePlayer() {
  const { user } = useAuth()
  const client = useClient()
  const queryClient = useQueryClient()

  const email = user && user.email
  const { data: player } = useQuery(
    "player",
    () => {
      return client(`players/?email=${email}`).then((data) => {
        return data[0]
      })
    },
    {
      initialData: () => {
        return queryClient.getQueryData("player")
      },
      enabled: email !== undefined,
      cacheTime: 1000 * 60 * 60,
    },
  )

  return new Player(player ?? {})
}

function useMyEvents() {
  const { user } = useAuth()
  const player = usePlayer()
  const client = useClient()

  const playerId = player && player.id
  const enable = user?.is_authenticated && playerId !== undefined
  const { data: myEvents } = useQuery(
    "my-events",
    () => {
      if (enable) {
        return client(
          `registration-slots/?player_id=${playerId}&seasons=${config.currentSeason}&seasons=${
            config.currentSeason - 1
          }`,
        ).then((data) => {
          if (data) return data.filter((s) => s.status === "R").map((s) => s.event)
          return []
        })
      }
    },
    {
      enabled: enable,
      cacheTime: 1000 * 60 * 5,
    },
  )
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

function useRegistrationStatus(eventId) {
  const { user } = useAuth()
  const myEvents = useMyEvents()

  if (user?.is_authenticated && myEvents && myEvents.length > 0) {
    return myEvents?.indexOf(eventId) >= 0
  }
  return false
}

function useUpdatePlayer() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    (updates) => {
      return client(`players/${updates.id}/`, {
        method: "PUT",
        data: updates,
      })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to update your profile")
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
      toast.error("💣 Aww, Snap! Failed to update your profile pic.")
    },
    onSuccess: (data) => {
      const player = queryClient.getQueryData("player")
      player.profile_picture = data
      queryClient.setQueryData("player", player)
    },
  })
}

function useFriends() {
  const client = useClient()
  const { data: players } = useQuery(
    ["friends"],
    () =>
      client("friends").then((data) =>
        data.map((p) => {
          const player = new Player(p)
          player.isFriend = true
          return player
        }),
      ),
    {
      cacheTime: Infinity,
    },
  )

  return players ?? []
}

function useAddFriend() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    (playerId) => {
      return client(`friends/add/${playerId}/`, { method: "POST" })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to update your friends list.")
      },
      onSuccess: () => {
        queryClient.invalidateQueries("friends")
      },
    },
  )
}

function useRemoveFriend() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation(
    (playerId) => {
      return client(`friends/remove/${playerId}/`, { method: "DELETE" })
    },
    {
      onError: () => {
        toast.error("💣 Aww, Snap! Failed to update your friends list.")
      },
      onSuccess: () => {
        queryClient.invalidateQueries("friends")
      },
    },
  )
}

export {
  useAddFriend,
  useFriends,
  useMyCards,
  useMyEvents,
  usePlayer,
  usePlayerProfilePic,
  useRegistrationStatus,
  useRemoveFriend,
  useUpdatePlayer,
}
