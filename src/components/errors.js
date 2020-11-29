/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

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

function RegistrationErrorFallback({ error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Doh! Stupid computers...</p>
      <pre>{error}</pre>
    </div>
  )
}

function FullPageErrorFallback({ error }) {
  return (
    <div
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
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export { DuplicateEmailDisplay, ErrorDisplay, FullPageErrorFallback, RegistrationErrorFallback }
