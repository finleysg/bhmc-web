import styled from "@emotion/styled/macro"

import { Groups, useGroups } from "hooks/account-hooks"
import { HiExternalLink } from "react-icons/hi"
import { RiDeleteBin5Line, RiHomeGearLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import * as colors from "styles/colors"

import { IconActionButton } from "./buttons"

const ActionContainer = styled.div({
  position: "absolute",
  top: 3,
  right: 3,
})

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
export const isAdmin = (groups) => {
  return groups.indexOf(Groups.Administrators) >= 0 || groups.indexOf(Groups.TournamentAdmins) >= 0
}

function PhotoLink({ to, color, ...rest }) {
  return (
    <ActionContainer {...rest}>
      <ActionLink color={color} href={to} target="_blank">
        <HiExternalLink />
      </ActionLink>
    </ActionContainer>
  )
}

function AdminLink({ to, color, label, ...rest }) {
  const groups = useGroups()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(to)
  }

  if (isAdmin(groups)) {
    return (
      <ActionContainer {...rest}>
        <IconActionButton color={color} label={label} onAction={handleClick}>
          <RiHomeGearLine />
        </IconActionButton>
      </ActionContainer>
    )
  }
  return null
}

function AdminAction({ id, color, label, onAction, ...rest }) {
  const groups = useGroups()

  if (isAdmin(groups)) {
    return (
      <ActionContainer {...rest}>
        <IconActionButton color={color} label={label} onAction={() => onAction(id)}>
          <RiDeleteBin5Line />
        </IconActionButton>
      </ActionContainer>
    )
  }
  return null
}

function AdminAction2({ id, color, label, onAction, children, ...rest }) {
  const groups = useGroups()

  if (isAdmin(groups)) {
    return (
      <ActionContainer {...rest}>
        <IconActionButton color={color} label={label} onAction={() => onAction(id)}>
          {children}
        </IconActionButton>
      </ActionContainer>
    )
  }
  return null
}

export { AdminAction, AdminAction2, AdminLink, PhotoLink }
