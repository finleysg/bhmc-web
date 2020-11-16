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
  if (token) {
    const data = await client("auth/users/me", { token })
    data.token = token
    return data
  }
  return null
}

const AuthContext = React.createContext()
AuthContext.displayName = "AuthContext"

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()
  const navigate = useNavigate()

  React.useEffect(() => {
    const appDataPromise = loadUser()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    async ({ email, password }) => {
      return client("auth/token/login/", { data: { email, password } })
        .then((data) => {
          storeToken(data.auth_token)
        })
        .then(() => loadUser())
        .then((user) => setData(user))
        .then(() => {
          navigate("home")
        })
    },
    [setData, navigate],
  )

  const logout = React.useCallback(async () => {
    const token = await getToken()
    return client("auth/token/logout/", { token, method: "POST" })
      .then(() => removeToken())
      .then(() => {
        queryCache.clear()
        setData(null)
      })
      .then(() => navigate("home"))
  }, [setData, navigate])

  const register = React.useCallback(
    async ({ first_name, last_name, email, password, re_password }) => {
      return client("auth/users/", {
        data: { first_name, last_name, email, password, re_password },
      })
        .then((user) => {
          setData(user)
        })
        .then(() => navigate("session/account/confirm"))
    },
    [setData, navigate],
  )

  const activate = React.useCallback(async ({ uid, token }) => {
    return client("auth/users/activation/", { data: { uid, token } })
  }, [])

  const requestPasswordReset = React.useCallback(
    async ({ email }) => {
      return client("auth/users/reset_password/", { data: { email } })
        .then(() => {
          const user = {
            first_name: "unknown",
            last_name: "unknown",
            email: email,
          }
          setData(user)
        }) // anonymous user, but set the email
        .then(() => navigate("/session/reset-password/sent"))
    },
    [setData, navigate],
  )

  const resetPassword = React.useCallback(
    async ({ uid, token, new_password, re_new_password }) => {
      return client("auth/users/reset_password_confirm/", {
        data: { uid, token, new_password, re_new_password },
      }).then(() => navigate("/session/reset-password/complete"))
    },
    [navigate],
  )

  const changePassword = React.useCallback(
    async ({ current_password, new_password, re_new_password }) => {
      return client("auth/users/set_password/", {
        data: { current_password, new_password, re_new_password },
      })
    },
    [],
  )

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      activate,
      requestPasswordReset,
      resetPassword,
      changePassword,
    }),
    [login, logout, register, activate, requestPasswordReset, resetPassword, changePassword, user],
  )

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
  const {
    user: { token },
  } = useAuth()
  return React.useCallback((endpoint, config) => client(endpoint, { ...config, token }), [token])
}

export { AuthProvider, useAuth, useClient }
