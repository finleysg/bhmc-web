/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core"
import styled from "@emotion/styled/macro"

import { ImSpinner9 } from "react-icons/im"
import * as colors from "styles/colors"
import { rgba } from "styles/rgba"

const loaderCss = {
  position: "absolute",
  margin: "auto",
  width: "3rem",
  height: "3rem",
  fontSize: "3rem",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  color: colors.green,
  zIndex: 10,
}

const overlayCss = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: rgba(colors.teal, 0.3),
}

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
})

const Spinner = styled(ImSpinner9)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  "aria-label": "loading",
}

function OverlaySpinner(props) {
  const { loading } = props
  if (loading) {
    return (
      <div css={overlayCss}>
        <div css={loaderCss}>
          <Spinner />
        </div>
      </div>
    )
  }
  return null
}

function LoadingSpinner(props) {
  const { loading, offset } = props
  if (loading) {
    return (
      <div
        css={{
          fontSize: "3em",
          paddingTop: offset ?? "120px",
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
  return null
}

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: "4em",
        height: "100vh",
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

export { FullPageSpinner, LoadingSpinner, OverlaySpinner, Spinner }
