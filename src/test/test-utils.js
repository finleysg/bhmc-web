import { render } from "@testing-library/react"

import { AuthProvider } from "context/auth-context"
import { createMemoryHistory } from "history"
import { MemoryRouter as Router, Route } from "react-router-dom"

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

function renderWithRouterMatch(
  ui,
  { path = "/", route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  console.log(history.location)
  return {
    ...render(
      <Router history={history}>
        <AuthProvider>
          <Route path={path} element={ui} />
        </AuthProvider>
      </Router>,
    ),
  }
}

// const renderWithRouter = ({children}) => (
//     render(
//       <Router initialEntries={['blogs/1']}>
//         <Route path='blogs/:blogId'>
//           {children}
//         </Route>
//       </Router>
//     )
//   )

function AuthWrapper({ children }) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export { AuthWrapper, deferred, renderWithRouterMatch }
