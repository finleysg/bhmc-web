import { rest } from "msw"
import { buildPlayer } from "test/data/account"
import { apiUrl } from "utils/client-utils"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [
  rest.get(apiUrl("players/"), async (req, res, ctx) => {
    const email = req.url.searchParams.get("email")
    return res(ctx.delay(delay), ctx.json(buildPlayer({ email })))
  }),
  rest.put(apiUrl("players/:playerId/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(204))
  }),
]

export { handlers }
