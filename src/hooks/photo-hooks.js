import { useClient } from "context/auth-context"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

function usePhoto(id) {
  const client = useClient()
  const url = `photos/${id}/`
  return useQuery([url], () => client(url), {
    cacheTime: Infinity,
  })
}

function useRandomPhotos({ take, tag }) {
  const client = useClient()

  const getUrl = () => {
    if (tag) {
      return `random-photos/?take=${take}&tag=${tag}`
    } else {
      return `random-photos/?take=${take}`
    }
  }
  const url = getUrl()

  return useQuery(["random-photos", tag || "none"], () => client(url), {
    cacheTime: 5,
  })
}

function useCreatePhoto() {
  const formClient = useFormClient()

  return useMutation((formData) => formClient(`photos/`, formData), {
    onError: () => {
      toast.error("💣 Aww, Snap! Failed to update your photo.")
    },
    onSuccess: () => {
      toast.success("📸 Your photo has been uploaded. Thank you!")
    },
  })
}

function useTags() {
  const client = useClient()

  return useQuery(["tags"], () => client(`tags`), {
    cacheTime: Infinity,
  })
}

export { useCreatePhoto, usePhoto, useRandomPhotos, useTags }
