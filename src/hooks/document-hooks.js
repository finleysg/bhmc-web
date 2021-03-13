import { useClient } from "context/auth-context"
import BhmcDocument from "models/document"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query"
import { toast } from "react-toastify"
import { useFormClient } from "utils/form-client"

function useEventDocuments(eventId) {
  const client = useClient()
  const hasEventId = eventId !== undefined
  const { data: documents } = useQuery(
    ["documents", eventId],
    () =>
      client(`documents/?event_id=${eventId}`).then((data) => {
        if (data && data.length > 0) {
          return data.map((doc) => new BhmcDocument(doc))
        }
      }),
    {
      enabled: hasEventId,
      cacheTime: Infinity,
    },
  )
  return documents ?? []
}

function useDocuments(documentType, year) {
  const client = useClient()

  const { data: documents } = useQuery(
    ["documents", documentType, year],
    () =>
      client(`documents/?type=${documentType}&year=${year}`).then((data) => {
        if (data && data.length > 0) {
          return data.map((doc) => new BhmcDocument(doc))
        }
        return []
      }),
    {
      cacheTime: Infinity,
    },
  )

  return documents ?? []
}

function useDocumentTypes(documentType) {
  const client = useClient()

  const { data: documents } = useQuery(
    ["documents", documentType],
    () =>
      client(`documents/?type=${documentType}`).then((data) => {
        if (data && data.length > 0) {
          return data.map((doc) => new BhmcDocument(doc))
        }
        return []
      }),
    {
      cacheTime: Infinity,
    },
  )

  return documents ?? []
}

function useEventDocumentUpload() {
  const formClient = useFormClient()
  const queryClient = useQueryClient()

  return useMutation((formData) => formClient(`documents/`, formData), {
    onError: () => {
      toast.error("💣 Aww, Snap! Failed to update your document.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries("documents")
    },
  })
}

function useEventDocumentDelete() {
  const client = useClient()
  const queryClient = useQueryClient()

  return useMutation((id) => client(`documents/${id}`, { method: "DELETE" }), {
    onError: () => {
      toast.error("💣 Aww, Snap! Failed to delete your document.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries("documents")
    },
  })
}

export {
  useDocuments,
  useDocumentTypes,
  useEventDocumentDelete,
  useEventDocuments,
  useEventDocumentUpload,
}
