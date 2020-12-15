import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

function usePageContent(contentKey) {
  const client = useClient()
  const { data } = useQuery({
    queryKey: ["page-content", { contentKey }],
    queryFn: () => client(`page-content/?key=${contentKey}`).then((data) => data[0]),
    config: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    },
  })

  return data ?? { title: "loading...", content: "loading..." }
}

export { usePageContent }
