import styled from "@emotion/styled/macro"

import { Link as RouterLink } from "react-router-dom"
import * as colors from "styles/colors"

import { Spinner } from "./spinners"

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: "pointer",
})

const buttonVariants = {
  primary: {
    background: colors.green,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}
const Button = styled.button(
  {
    padding: "10px 15px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
    cursor: "pointer",
  },
  ({ variant = "primary" }) => buttonVariants[variant],
)

const Link = styled(RouterLink)({
  color: colors.indigo,
  ":hover": {
    color: colors.indigoDarken10,
    textDecoration: "underline",
  },
})

function IconButton({ to, color, children }) {
  return (
    <RouterLink to={to} className={`btn btn--icon bg-${color}`}>
      <i>{children}</i>
    </RouterLink>
  )
}

function IconSubmitButton({ color, loading, children }) {
  return (
    <button type="submit" className={`btn btn--icon bg-${color}`} disabled={loading}>
      {!loading && <i>{children}</i>}
      {loading && (
        <i title="loading">
          <Spinner style={{ marginTop: ".6rem" }} />
        </i>
      )}
    </button>
  )
}

function SubmitButton({ loading, ...props }) {
  return (
    <button type="submit" className="btn btn-primary" disabled={loading} {...props}>
      Save
    </button>
  )
}

function CancelButton({ loading, onCancel, ...props }) {
  return (
    <button
      type="button"
      className="btn btn-light"
      disabled={loading}
      onClick={onCancel}
      {...props}
    >
      Cancel
    </button>
  )
}

export { Button, CancelButton, CircleButton, IconButton, IconSubmitButton, Link, SubmitButton }
