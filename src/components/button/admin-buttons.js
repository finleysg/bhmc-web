/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import styled from "@emotion/styled/macro"

import { useAuth } from "context/auth-context"
import { HiExternalLink } from "react-icons/hi"
import { RiDeleteBin5Line, RiHomeGearLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import * as colors from "styles/colors"

import { IconActionButton } from "./buttons"

const containerCss = {
  position: "absolute",
  top: 3,
  right: 3,
}

const ActionLink = styled.a`
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

function PhotoLink({ to, color, ...rest }) {
  return (
    <div css={containerCss} {...rest}>
      <ActionLink color={color} href={to} target="_blank">
        <HiExternalLink />
      </ActionLink>
    </div>
  )
}

function AdminLink({ to, color, label, ...rest }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  if (user.is_staff) {
    return (
      <div css={containerCss} {...rest}>
        <IconActionButton color={color} label={label} onAction={handleClick}>
          <RiHomeGearLine />
        </IconActionButton>
      </div>
    )
  }
  return null
}

function AdminAction({ id, color, label, onAction, ...rest }) {
  const { user } = useAuth()

  if (user.is_staff) {
    return (
      <div css={containerCss} {...rest}>
        <IconActionButton color={color} label={label} onAction={() => onAction(id)}>
          <RiDeleteBin5Line />
        </IconActionButton>
      </div>
    )
  }
  return null
}

function AdminAction2({ id, color, label, onAction, children, ...rest }) {
  const { user } = useAuth()

  if (user.is_staff) {
    return (
      <div css={containerCss} {...rest}>
        <IconActionButton color={color} label={label} onAction={() => onAction(id)}>
          {children}
        </IconActionButton>
      </div>
    )
  }
  return null
}

export { AdminAction, AdminAction2, AdminLink, PhotoLink }
