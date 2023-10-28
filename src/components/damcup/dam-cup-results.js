import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { useQuery } from "react-query"

function DamCupResults() {
  const client = useClient()
  const { data: results, status } = useQuery({
    queryKey: ["dam-cup-results"],
    queryFn: () => client("dam-cup").then((data) => data),
    staleTime: Infinity,
  })

  return (
    <div>
      {status !== "loading" && (
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th></th>
              <th className="text-center text-success">Bunker Hills</th>
              <th className="text-center text-primary">Edinburgh</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              return (
                <tr key={r.season}>
                  <td>
                    <span title={`Played at ${r.site}`}>{r.season}</span>
                  </td>
                  <td className="text-center">
                    {r.good_guys > r.bad_guys && (
                      <span style={{ fontWeight: "bold" }}>{r.good_guys}</span>
                    )}
                    {r.good_guys > r.bad_guys || <span>{r.good_guys}</span>}
                  </td>
                  <td className="text-center">
                    {r.good_guys < r.bad_guys && (
                      <span style={{ fontWeight: "bold" }}>{r.bad_guys}</span>
                    )}
                    {r.good_guys < r.bad_guys || <span>{r.bad_guys}</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <LoadingSpinner loading={status === "loading"} offset="90px" />
    </div>
  )
}

export { DamCupResults }
