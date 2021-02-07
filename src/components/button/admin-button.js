/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import { useAuth } from "context/auth-context"
import { RiHomeGearLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"

const containerCss = {
  position: "absolute",
  top: 3,
  right: 3,
  backgroundColor: colors.black,
  opacity: 0.25,
  borderRadius: "20px",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${colors.gray10}`,
  width: "20px",
  height: "20px",
  fontSize: "1.1rem",
  ":hover,:focus": {
    backgroundColor: colors.gray100,
    opacity: 1,
  },
}

const linkCss = {
  marginTop: "5px",
  color: colors.gray400,
  ":hover,:focus": {
    color: colors.green,
  },
}

function AdminLink({ to, label, ...rest }) {
  const { user } = useAuth()

  if (user.is_staff) {
    return (
      <div css={containerCss} title={label} {...rest}>
        <Link css={linkCss} to={to ?? "#"}>
          <RiHomeGearLine />
        </Link>
      </div>
    )
  }
  return null
}

export { AdminLink }
