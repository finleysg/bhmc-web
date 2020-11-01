import { queryCache } from "react-query"

const serverURL = process.env.REACT_APP_SERVER_URL

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

  const parseError = (error) => {
    if (typeof error === "string") {
      return error
    }
    if (error.non_field_errors) {
      return error.non_field_errors[0]
    }
    // TODO
    return error
  }

  return window.fetch(`${serverURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      queryCache.clear()
      // await auth.logout()
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
      const data = await response.json()
      return Promise.reject(parseError(data))
    }
  })
}

export { client }
