/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled/macro"
import Tooltip from "@reach/tooltip"

import { Link as RouterLink } from "react-router-dom"
import * as colors from "styles/colors"

import { Spinner } from "../spinners"

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

const ActionButton = styled.button`
  padding: 2px;
  border: 0;
  cursor: pointer;
  color: ${colors.gray400};
  background-color: transparent;
  font-size: 1.2rem;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.gray100};
    color: ${(props) => props.color};
  }
`

const ActionButtonSolid = styled.button`
  padding: 2px;
  border: 0;
  cursor: pointer;
  color: ${colors.white};
  background-color: ${(props) => props.color};
  font-size: 1.2rem;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.gray100};
    color: ${(props) => props.color};
  }
`

const Link = styled(RouterLink)({
  color: colors.indigo,
  ":hover": {
    color: colors.indigo,
    textDecoration: "underline",
  },
})

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  return (
    <Tooltip label={label}>
      <CircleButton
        css={{
          backgroundColor: "white",
          width: "28px",
          height: "28px",
          color: highlight,
          fontsize: "1.3rem",
          ":hover,:focus": {
            color: highlight,
          },
        }}
        onClick={onClick}
        aria-label={label}
        {...rest}
      >
        {icon}
      </CircleButton>
    </Tooltip>
  )
}

function SolidIconActionButton({ onAction, color, label, children }) {
  return (
    <Tooltip label={label}>
      <ActionButtonSolid color={color} onClick={onAction}>
        {children}
      </ActionButtonSolid>
    </Tooltip>
  )
}

function IconActionButton({ onAction, color, label, children }) {
  return (
    <Tooltip label={label}>
      <ActionButton color={color} onClick={onAction}>
        {children}
      </ActionButton>
    </Tooltip>
  )
}

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
      {props.label ?? "Save"}
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

export {
  Button,
  CancelButton,
  CircleButton,
  IconActionButton,
  IconButton,
  IconSubmitButton,
  Link,
  SolidIconActionButton,
  SubmitButton,
  TooltipButton,
}
