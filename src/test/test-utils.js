/* eslint-disable import/export */
import { render as rtlRender, screen, waitForElementToBeRemoved } from "@testing-library/react"

import { AuthProvider } from "context/auth-context"
import { EventRegistrationProvider } from "context/registration-context"
import { createMemoryHistory } from "history"
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
  waitForElementToBeRemoved(
    () => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)],
    {
      timeout: 4000,
    },
  )

function render(ui, { user = guestUser, history, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient}>
      <Router history={history}>
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

function renderSession(ui, { history, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient}>
      <Router history={history}>
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

function createHistory(startingRoute) {
  return createMemoryHistory({
    initialEntries: [startingRoute ?? "/"],
  })
}

const deferred = () => {
  let resolve
  let reject
  // eslint-disable-next-line promise/param-names
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

export * from "@testing-library/react"
export {
  createHistory,
  deferred,
  formSubmitSpy,
  render,
  renderSession,
  renderWithEventRegistration,
  simpleRender,
  testingQueryCache,
  testingQueryClient,
  waitForLoadingToFinish,
}
