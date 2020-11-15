/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core"
import styled from "@emotion/styled/macro"

import { ImSpinner } from "react-icons/im"

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
})

const Spinner = styled(ImSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  "aria-label": "loading",
}

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: "4em",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  )
}

export { FullPageSpinner, Spinner }
