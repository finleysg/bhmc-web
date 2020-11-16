import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

function usePolicies() {
  const client = useClient()

  const result = useQuery({
    queryKey: "policies",
    queryFn: () =>
      client("api/policies/").then((data) => {
        return data
      }),
  })

  return { ...result, policies: result.data ?? [] }
}

export { usePolicies }
