import * as auth from "context/auth-provider"
import { queryCache } from "react-query"

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
      queryCache.clear()
      await auth.logout()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({ message: "Please re-authenticate." })
    }
    if (response.ok) {
      if (response.status !== 204) {
        const data = await response.json()
        return data
      }
      return null
    } else {
      try {
        const data = await response.json()
        return Promise.reject(parseError(data))
      } catch {
        // probably html from django
        return Promise.reject("django server error: check the server logs for details")
      }
    }
  })
}

export { client }
