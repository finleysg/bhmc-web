import { rest } from "msw"
import { getTestEvent, getTestEvents } from "test/data/test-events"
import { apiUrl } from "utils/client-utils"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [

  rest.get(apiUrl("events"), async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(getTestEvents()))
  }),

  rest.get(apiUrl("events/:eventId"), async (req, res, ctx) => {
    const eventId = req.url.params.get("eventId")
    return res(ctx.delay(delay), ctx.json(getTestEvent({ eventType: eventId, state: "registration" })))
  }),
  rest.get(apiUrl("registration/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), [])
  }),
  rest.get(apiUrl("payments/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), [])
  }),
  rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
    return res(ctx.status(200), [])
  }),
]

export { handlers }
