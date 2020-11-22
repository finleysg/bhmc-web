import { setupServer } from "msw/node"

import { handlers } from "./auth-handlers"

const server = setupServer(...handlers)

export * from "msw"
export { server }
