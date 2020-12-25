/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { Link } from "react-router-dom"
import * as colors from "styles/colors"

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
}

// "We already have an account with that email. Do you need to reset your password?"
function DuplicateEmailDisplay({ variant = "stacked", ...props }) {
  return (
    <div
      role="alert"
      css={[{ color: colors.danger, marginTop: "1rem" }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>
        "We already have an account with that email. Do you need to{" "}
        <Link to="/session/reset-password">reset your password</Link>?"
      </span>
    </div>
  )
}

function ErrorDisplay({ isError, error, variant = "stacked", ...props }) {
  if (isError) {
    return (
      <div
        role="alert"
        css={[{ color: colors.danger, marginTop: "1rem" }, errorMessageVariants[variant]]}
        {...props}
      >
        <span>There was an error: </span>
        <pre
          css={[
            { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
            errorMessageVariants[variant],
          ]}
        >
          {error}
        </pre>
      </div>
    )
  }
  return null
}

function RegistrationErrorFallback({ error, resetErrorBoundary }) {
  const scrollRef = React.useRef()

  React.useLayoutEffect(() => {
    scrollRef.current.scrollIntoView()
  }, [])

  return (
    <div ref={scrollRef} className="card border border-danger">
      <div className="card-header text-white bg-danger">Registration Failure</div>
      <div className="card-body">
        <p>
          An error occurred and we cannot continue the registration process. This may be temporary.
          Click the Reset button to start over. If this problem persists, please contact{" "}
          <a href="mailto:admin@bhmc.org">admin@bhmc.org</a>.
        </p>
        <div
          role="alert"
          css={[{ color: colors.danger, marginTop: "1rem" }, errorMessageVariants.stacked]}
        >
          <span>Error detail: </span>
          <pre
            css={[
              { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
              errorMessageVariants.stacked,
            ]}
          >
            {error}
          </pre>
          <div className="row" style={{ marginTop: "1rem", textAlign: "right" }}>
            <div className="col-12">
              <button
                className="btn btn-danger"
                style={{ marginLeft: ".5rem" }}
                onClick={resetErrorBoundary}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      style={{ padding: "20px" }}
      role="alert"
      css={{
        color: colors.danger,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>
        Uh oh... There's a problem. This is probably a network error or bad internet connection.
      </p>
      <pre>{error}</pre>
      <button className="btn btn-primary" onClick={() => window.location.assign(window.location)}>
        Refresh
      </button>
    </div>
  )
}

export { DuplicateEmailDisplay, ErrorDisplay, FullPageErrorFallback, RegistrationErrorFallback }
