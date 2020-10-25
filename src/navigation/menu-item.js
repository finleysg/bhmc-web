/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import { Link as RouterLink, useMatch } from "react-router-dom"
import * as colors from "styles/colors"
import { rgba } from "styles/rgba"

function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <RouterLink
      css={[
        {
          display: "block",
          textDecoration: "none",
          padding: "10px",
          margin: "5px 15px 0px",
          borderRadius: "4px",
          color: colors.base,
          opacity: 0.86,
          "&:hover": {
            background: rgba(colors.base, 0.13),
            color: colors.base,
            textDecoration: "none",
          },
        },
        match
          ? {
              color: colors.base,
              opacity: 1,
              background: rgba(colors.base, 0.23),
            }
          : null,
      ]}
      {...props}
    />
  )
}

function MenuItem({ path, icon, name }) {
  return (
    <li
      css={[
        {
          position: "relative",
          display: "block",
          listStyle: "none",
        },
      ]}
    >
      <NavLink to={path}>
        <i
          css={{
            fontSize: "28px",
            fontWeight: 100,
            float: "left",
            marginRight: "15px",
            lineHeight: "30px",
            width: "30px",
            textAlign: "center",
            "&:hover": {
              color: colors.base,
            },
          }}
        >
          {icon}
        </i>
        <p
          css={{
            margin: 0,
            lineHeight: "30px",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            position: "relative",
            color: colors.base,
            transform: "translate3d(0px, 0, 0)",
            display: "block",
            height: "auto",
            opacity: 1,
          }}
        >
          {name}
        </p>
      </NavLink>
    </li>
  )
}

export { MenuItem }
