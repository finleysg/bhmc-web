import * as auth from "context/auth-provider"

import { apiUrl, parseError } from "./client-utils"

async function client(endpoint, { data, token, headers: customHeaders, ...customConfig } = {}) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  const url = apiUrl(endpoint)

  return window.fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout()
      window.location.assign(window.location)
      return Promise.reject("User must re-authenticate.")
    }
    if (response.ok) {
      if (response.status !== 204) {
        const data = await response.json()
        return data
      }
      return null
    } else {
      // react-query needs us to throw, not just reject the promis
      const data = await response.json()
      throw new Error(parseError(data))
    }
  })
}

export { client }
