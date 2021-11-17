import { useClient } from "context/auth-context"
import { useMutation, useQuery } from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

function usePhotos({ season, tags }) {
  const client = useClient()

  const getUrl = () => {
    if (Boolean(season)) {
      if (Boolean(tags)) {
        return `photos/?year=${season}&tags=${tags.join(",")}`
      } else {
        return `photos/?year=${season}}`
      }
    } else {
      if (Boolean(tags)) {
        return `photos/?tags=${tags.join(",")}`
      } else {
        throw new Error("cannot return all photos")
      }
    }
  }
  const url = getUrl()

  const { data: photos } = useQuery(
    ["photos", url],
    () =>
      client(url).then((data) => {
        if (data && data.length > 0) {
          return data.map((pic) => pic)
        }
        return []
      }),
    {
      cacheTime: Infinity,
    },
  )

  return photos ?? []
}

function useCreatePhoto() {
  const formClient = useFormClient()

  return useMutation((formData) => formClient(`photos/`, formData), {
    onError: () => {
      toast.error("💣 Aww, Snap! Failed to update your photo.")
    },
    onSuccess: (data) => {
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

export { useCreatePhoto, usePhotos, useTags }
