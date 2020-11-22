import { authUrl, parseError } from "./client-utils"

async function client(endpoint, data, token) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
    },
  }

  const url = authUrl(endpoint)

  return window.fetch(url, config).then(async (response) => {
    if (response.ok) {
      if (response.status !== 204) {
        const data = await response.json()
        return data
      }
      return null
    } else {
      const data = await response.json()
      return Promise.reject(parseError(data))
    }
  })
}

export { client }
