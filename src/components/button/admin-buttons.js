/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import { useAuth } from "context/auth-context"
import {
  RiDeleteBin5Line,
  RiHomeGearLine,
} from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { IconActionButton } from "./buttons"

const containerCss = {
  position: "absolute",
  top: 3,
  right: 3,
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

export { AdminAction, AdminLink }
