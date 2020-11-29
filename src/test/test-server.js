import { setupServer } from "msw/node"

import { handlers as accountHandlers } from "./account-handlers"
import { handlers } from "./auth-handlers"

const server = setupServer(...handlers, ...accountHandlers)

export * from "msw"
export { server }
