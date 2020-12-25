import "./main-layout.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { ErrorBoundary } from "react-error-boundary"
import { useRoutes } from "react-router-dom"

import { mainRoutes } from "./routes"

function BoundedRoutes() {
  const { user } = useAuth()
  const routing = useRoutes(mainRoutes(user))

  const errorHandler = (error, info) => {
    console.error(error)
    console.info(info)
  }

  return (
    <ErrorBoundary
      onError={errorHandler}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="card border border-danger">
          <div className="card-header text-white bg-danger">Network or Server Failure</div>
          <div className="card-body">
            <p>
              An error occurred and we cannot continue loading the page. This may be temporary.
              Click the Refresh button to reload this page. If this problem persists, please contact{" "}
              <a href="mailto:admin@bhmc.org">admin@bhmc.org</a>.
            </p>
            <pre>{error}</pre>
            <div className="row" style={{ marginTop: "1rem", textAlign: "right" }}>
              <div className="col-12">
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: ".5rem" }}
                  onClick={() => {
                    resetErrorBoundary()
                    window.location.assign(window.location)
                  }}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    >
      {routing}
    </ErrorBoundary>
  )
}

export default BoundedRoutes
