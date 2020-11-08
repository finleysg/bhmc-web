/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { FullPageErrorFallback } from "components/errors"
import { FullPageSpinner } from "components/spinners"
import { queryCache } from "react-query"
import { useNavigate } from "react-router-dom"
import { client } from "utils/api-client"
import { useAsync } from "utils/use-async"

const localStorageKey = "__bhmc_token__"

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

async function storeToken(token) {
  return window.localStorage.setItem(localStorageKey, token)
}

async function removeToken() {
  return window.localStorage.removeItem(localStorageKey)
}

async function loadUser() {
  const token = await getToken()
  console.log(`getting user with token ${token}`)
  if (token) {
    const data = await client("auth/users/me", { token })
    console.log(`received user ${JSON.stringify(data)}`)
    return data
  }
  return null
}

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
  const { data: user, status, error, isLoading, isIdle, isError, isSuccess, run, setData } = useAsync()
  const navigate = useNavigate()

  React.useEffect(() => {
    const appDataPromise = loadUser()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    (form) => {
      const { email, password } = form
      return client("auth/token/login/", { data: { email, password } })
        .then((data) => {
          console.log(`storing token ${data.auth_token}`)
          storeToken(data.auth_token)
        })
        .then(() => loadUser())
        .then((user) => setData(user))
        .then(() => {
          console.log("going home")
          navigate("home")
        })
    },
    [setData, navigate],
  )

  const logout = React.useCallback(async () => {
    const token = await getToken()
    client("auth/token/logout/", { token, method: "POST" })
      .then(() => removeToken())
      .then(() => {
        queryCache.clear()
        setData(null)
      })
      .then(() => navigate("home"))
  }, [setData, navigate])

  const register = React.useCallback(
    // first_name, last_name, email, password, re_password
    (form) => {
      client("auth/users/", form).then((user) => setData(user))
    },
    [setData],
  )

  const value = React.useMemo(() => ({ user, login, logout, register }), [login, logout, register, user])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const { user } = useAuth()
  const token = user?.token // TODO: will not have the token on the user
  return React.useCallback(
    (endpoint, config) => {
      client(endpoint, { ...config, token })
    },
    [token],
  )
}

export { AuthProvider, useAuth, useClient }
