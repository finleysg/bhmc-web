import React from "react"

import { FullPageErrorFallback } from "components/errors"
import { FullPageSpinner } from "components/spinners"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { client } from "utils/api-client"
import { useAsync } from "utils/use-async"

import * as auth from "./auth-provider"

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
  const queryClient = useQueryClient()

  const loadUser = React.useCallback(async () => {
    const user = await auth.getUser()
    if (user.token) {
      const players = await client(`players/?email=${user.email}`)
      queryClient.setQueryData("player", players[0])
    }
    return user
  }, [queryClient])

  React.useEffect(() => {
    const appDataPromise = loadUser()
    run(appDataPromise)
  }, [run, loadUser])

  const login = React.useCallback(
    async ({ email, password }) => {
      return auth
        .login(email, password)
        .then(() => loadUser())
        .then((user) => setData(user))
        .then(() => navigate("home"))
    },
    [setData, navigate, loadUser],
  )

  const logout = React.useCallback(async () => {
    return auth
      .logout()
      .then(() => navigate("home"))
      .then(() => {
        queryClient.clear()
        setData(null)
      })
  }, [setData, navigate, queryClient])

  const register = React.useCallback(
    async ({ first_name, last_name, email, ghin, password, re_password }) => {
      return auth
        .register(first_name, last_name, email, ghin, password, re_password)
        .then((user) => setData(user))
        .then(() => navigate("session/account/confirm"))
    },
    [setData, navigate],
  )

  const activate = React.useCallback(async ({ uid, token }) => {
    return auth.activate(uid, token)
  }, [])

  const requestPasswordReset = React.useCallback(
    async ({ email }) => {
      return auth
        .requestPasswordReset(email)
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
      return auth
        .resetPassword(uid, token, new_password, re_new_password)
        .then(() => navigate("/session/reset-password/complete"))
    },
    [navigate],
  )

  const changePassword = React.useCallback(
    async ({ current_password, new_password, re_new_password }) => {
      return auth.changePassword(current_password, new_password, re_new_password)
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
  const { user } = useAuth()
  const token = user ? user.token : undefined
  return React.useCallback((endpoint, config) => client(endpoint, { ...config, token }), [token])
}

export { AuthProvider, useAuth, useClient }
