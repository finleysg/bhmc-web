/* eslint-disable import/export */
import { render as rtlRender, screen, waitForElementToBeRemoved } from "@testing-library/react"

import { AuthProvider } from "context/auth-context"
import { EventRegistrationProvider } from "context/registration-context"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
import { MemoryRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

const guestUser = {}
const testingQueryCache = new QueryCache()
const testingQueryClient = new QueryClient({ queryCache: testingQueryCache })

const formSubmitSpy = () => {
  const promise = Promise.resolve({})
  return jest.fn(() => promise)
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)], {
    timeout: 4000,
  })

function render(ui, { user = guestUser, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient}>
      <Router>
        <AuthProvider value={{ user }}>
          <div>
            <ToastContainer />
            {children}
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function renderWithEventRegistration(ui, { user = guestUser, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient}>
      <Router>
        <AuthProvider value={{ user }}>
          <EventRegistrationProvider>
            <div>
              <ToastContainer />
              {children}
            </div>
          </EventRegistrationProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function renderSession(ui, { ...options } = {}) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient}>
      <Router>
        <AuthProvider>
          <div>
            <ToastContainer />
            {children}
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function simpleRender(ui, { user = null, ...options } = {}) {
  const Wrapper = ({ children }) => <Router>{children}</Router>
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from "@testing-library/react"
export {
  formSubmitSpy,
  render,
  renderSession,
  renderWithEventRegistration,
  simpleRender,
  testingQueryCache,
  testingQueryClient,
  waitForLoadingToFinish,
}
