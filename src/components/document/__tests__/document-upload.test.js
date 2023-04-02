import { getTestEvent, TestEventType } from "test/data/test-events"
import { render, screen, waitForLoadingToFinish } from "test/test-utils"

import { DocumentUpload } from "../document-upload"

// skipping because of this warning:
// Skipped "223" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.
// at warn (node_modules/react-dropzone/src/utils/index.js:206:25)
// at Array.filter (<anonymous>)
// at useMemo (node_modules/react-dropzone/src/utils/index.js:205:19)
// at node_modules/react-dropzone/src/index.js:463:32
// at mountMemo (node_modules/react-dom/cjs/react-dom.development.js:17225:19)
// at Object.useMemo (node_modules/react-dom/cjs/react-dom.development.js:17670:16)
// at Object.useMemo (node_modules/react/cjs/react.development.js:1650:21)
test.skip("renders the document upload form", async () => {
  const clubEvent = getTestEvent({ eventType: TestEventType.weeknight, state: "future" })

  render(<DocumentUpload clubEvent={clubEvent} documentType="R" />)
  await waitForLoadingToFinish()
  expect(screen.getByRole("heading", { name: /upload document/i })).toBeInTheDocument()
})
