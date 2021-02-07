const API_BASE = process.env.REACT_APP_API_URL
const AUTH_BASE = process.env.REACT_APP_AUTH_URL
const SERVER_BASE = process.env.REACT_APP_SERVER_URL

const normalizeEndpoint = (endpoint) => {
  const [base, querystring] = endpoint.split("?")
  if (!base.startsWith("/") && base.endsWith("/")) {
    return `${base}${querystring ? "?" + querystring : ""}`
  }
  if (!base.startsWith("/") && !base.endsWith("/")) {
    return `${base}/${querystring ? "?" + querystring : ""}`
  }
  if (base.startsWith("/") && base.endsWith("/")) {
    return `${base.substring(1)}${querystring ? "?" + querystring : ""}`
  }
  if (base.startsWith("/") && !base.endsWith("/")) {
    return `${base.substring(1)}/${querystring ? "?" + querystring : ""}`
  }
  throw new Error("Someone messed up their url munging!")
}

const apiUrl = (endpoint) => {
  return `${API_BASE}/${normalizeEndpoint(endpoint)}`
}
const authUrl = (endpoint) => {
  return `${AUTH_BASE}/${normalizeEndpoint(endpoint)}`
}
const serverUrl = (endpoint) => {
  return `${SERVER_BASE}/${normalizeEndpoint(endpoint)}`
}

const parseError = (error) => {
  if (typeof error === "string") {
    return error
  }
  if (error.non_field_errors) {
    return error.non_field_errors[0]
  }
  if (error.detail) {
    return error.detail
  }
  return JSON.stringify(error)
}

export { apiUrl, authUrl, parseError, serverUrl }
