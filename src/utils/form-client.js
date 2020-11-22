import React from "react"

import { useAuth } from "context/auth-context"

import { apiUrl, parseError } from "./client-utils"

async function client(endpoint, formData, token) {
  const config = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: token ? `Token ${token}` : undefined,
    },
  }

  const url = apiUrl(endpoint)

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

function useFormClient() {
  const {
    user: { token },
  } = useAuth()
  if (!token) {
    throw new Error("A form client requires an authenticated user.")
  }
  return React.useCallback((endpoint, formData) => client(endpoint, formData, token), [token])
}

export { useFormClient }
