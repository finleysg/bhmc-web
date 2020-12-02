import { setupServer } from "msw/node"

import { handlers } from "./test-handlers"

const server = setupServer(...handlers)

export * from "msw"
export { server }
