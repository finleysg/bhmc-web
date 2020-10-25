/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

function Caret(active) {
  return (
    <b
      css={[
        {
          display: "inline-block",
          width: 0,
          height: 0,
          marginLeft: "2px",
          borderTop: "4px dashed",
          borderRight: "4px solid transparent",
          borderLeft: "4px solid transparent",
        },
        active
          ? {
              transition: "all 150ms ease-in",
            }
          : null,
      ]}
    />
  )
}

export { Caret }
