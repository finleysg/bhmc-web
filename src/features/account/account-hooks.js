import { useAuth, useClient } from "context/auth-context"
import Player from "models/player"
import { queryCache, useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

const playerMutationConfig = {
  onSettled: () => queryCache.invalidateQueries("player"),
  onError: () => toast.error("💣 Aww, Snap!"),
}

function usePlayer() {
  const { user } = useAuth()
  const client = useClient()

  const { isLoading, isError, isSuccess, data: player, error } = useQuery({
    queryKey: "player",
    queryFn: () =>
      client(`players/?email=${user.email}`).then((data) => {
        return new Player(data[0])
      }),
  })

  return { isLoading, isError, isSuccess, player, error }
}

function useUpdatePlayer() {
  const client = useClient()

  return useMutation(
    (updates) =>
      client(`players/${updates.id}/`, {
        method: "PUT",
        data: updates,
      }),
    playerMutationConfig,
  )
}

function usePlayerProfilePic() {
  const formClient = useFormClient()

  return useMutation((formData) => formClient(`photos/`, formData), playerMutationConfig)
}

export { usePlayer, usePlayerProfilePic, useUpdatePlayer }
