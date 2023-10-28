import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

function usePolicies() {
  const client = useClient()

  const result = useQuery({
    queryKey: "policies",
    queryFn: () =>
      client("policies").then((data) => {
        return data
      }),
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  return { ...result, policies: result.data ?? [] }
}

export { usePolicies }
