import styled from "@emotion/styled/macro"
import { AlertDialog } from "@reach/alert-dialog"

import * as mq from "styles/media-queries"

const ConfirmAlertDialog = styled(AlertDialog)({
  maxWidth: "360px",
  margin: "20vh auto",
  [mq.small]: {
    width: "90vw",
    margin: "10vh auto",
  },
})

export { ConfirmAlertDialog }
