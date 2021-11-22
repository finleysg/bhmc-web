import React from "react"

import { useAuth } from "context/auth-context"

import { apiUrl, parseError } from "./client-utils"

async function client(endpoint, formData, method, token) {
  const config = {
    method: method ?? "POST",
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
  const { user } = useAuth()
  const token = user ? user.token : undefined
  //   if (!token) {
  //     throw new Error("A form client requires an authenticated user.")
  //   }
  return React.useCallback(
    (endpoint, formData, method) => client(endpoint, formData, method, token),
    [token],
  )
}

export { useFormClient }
