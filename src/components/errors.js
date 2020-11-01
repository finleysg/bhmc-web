/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import * as colors from "styles/colors"

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
}

function ErrorMessage({ error, variant = "stacked", ...props }) {
  return (
    <div role="alert" css={[{ color: colors.danger, marginTop: "1rem" }, errorMessageVariants[variant]]} {...props}>
      <span>There was an error: </span>
      <pre css={[{ whiteSpace: "break-spaces", margin: "0", marginBottom: -5 }, errorMessageVariants[variant]]}>
        {error}
      </pre>
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

export { ErrorMessage, FullPageErrorFallback }
