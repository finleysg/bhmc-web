import { useCallback, useEffect, useState } from "react"

import { useClient } from "context/auth-context"

function usePagingData(url) {
  // const { data, isLoading, run } = useAsync()
  const [results, setResults] = useState([])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const client = useClient()

  const fetchPage = useCallback(async () => {
    // The data returned from a paging url is
    // count (number), next (url), previous (url),
    // and results (array)
    try {
      setLoading(true)
      const data = await client(url)
      setData(data)
      setResults((prev) => [...prev, ...data.results])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }, [client, url])

  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  return { next: data.next, count: data.count, results, loading }
}

export { usePagingData }
