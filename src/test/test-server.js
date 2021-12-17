import { setupServer } from "msw/node"

import { handlers as eventRegistrationHandlers } from "./handlers/event-registration-handlers"
import { handlers as playerHandlers } from "./handlers/player-handlers"
import { handlers as userHandlers } from "./handlers/user-handlers"

const server = setupServer(...userHandlers, ...playerHandlers, ...eventRegistrationHandlers)

export * from "msw"
export { server }
