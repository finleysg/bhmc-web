import { render as rtlRender, screen, waitForElementToBeRemoved } from "@testing-library/react"

import { AuthProvider } from "context/auth-context"
import { MemoryRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 },
  )

function render(ui, { user = null, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <Router>
      <AuthProvider value={{ user }}>
        <div>
          <ToastContainer />
          {children}
        </div>
      </AuthProvider>
    </Router>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function renderWithRouter(ui, { ...options } = {}) {
  const Wrapper = ({ children }) => <Router>{children}</Router>
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function AuthWrapper({ children }) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export * from "@testing-library/react"
// override React Testing Library's render with our own
export { AuthWrapper, deferred, render, renderWithRouter, waitForLoadingToFinish }
