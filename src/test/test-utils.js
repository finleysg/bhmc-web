import { render as rtlRender } from "@testing-library/react"

import { AuthProvider } from "context/auth-context"
import { MemoryRouter as Router } from "react-router-dom"

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

// function renderWithRouterMatch(
//   ui,
//   { path = "/", route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {},
// ) {
//   console.log(history.location)
//   return {
//     ...render(
//       <Router history={history}>
//         <AuthProvider>
//           <Route path={path} element={ui} />
//         </AuthProvider>
//       </Router>,
//     ),
//   }
// }

function render(ui, { theme = "anonymous", ...options } = {}) {
  const Wrapper = ({ children }) => (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function renderWithRouter(ui, { theme = "anonymous", ...options } = {}) {
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
export { AuthWrapper, deferred, render, renderWithRouter }
