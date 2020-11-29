import { client } from "utils/auth-client"

const localStorageKey = "__bhmc_token__"

async function getUser() {
  const token = window.localStorage.getItem(localStorageKey)
  if (token) {
    return client("users/me", null, token).then((user) => {
      user.token = token
      return user
    })
  }
  return {}
}

async function login(email, password) {
  return client("token/login", { email, password }).then((data) => {
    window.localStorage.setItem(localStorageKey, data.auth_token)
    return data.auth_token
  })
}

async function logout() {
  const token = window.localStorage.getItem(localStorageKey)
  return client("token/logout", {}, token).then(() =>
    window.localStorage.removeItem(localStorageKey),
  )
}

async function register(first_name, last_name, email, password, re_password) {
  return client("users", { first_name, last_name, email, password, re_password })
}

async function activate(uid, token) {
  return client("users/activation", { uid, token })
}

async function requestPasswordReset(email) {
  return client("users/reset_password", { email })
}

async function resetPassword(uid, token, new_password, re_new_password) {
  return client("users/reset_password_confirm", { uid, token, new_password, re_new_password })
}

async function changePassword(current_password, new_password, re_new_password) {
  const token = window.localStorage.getItem(localStorageKey)
  return client("users/set_password", { current_password, new_password, re_new_password }, token)
}

export {
  activate,
  changePassword,
  getUser,
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
}
