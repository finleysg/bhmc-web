import styled from "@emotion/styled/macro"

import { Link as RouterLink } from "react-router-dom"
import * as colors from "styles/colors"

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
    background: colors.indigo,
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

export { Button, CircleButton, Link }
