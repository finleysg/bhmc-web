import * as faker from "faker"
import { rest } from "msw"
import { apiUrl, authUrl } from "utils/client-utils"

import { buildPlayer } from "./generate/account"
import { buildUser } from "./generate/auth"
import { testSeasonRegistrationEvent } from "./generate/season-registration"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [
  // Auth handlers
  rest.post(authUrl("token/login/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ auth_token: faker.random.alphaNumeric(12) }))
  }),
  rest.get(authUrl("users/me/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(buildUser()))
  }),
  rest.post(authUrl("users/"), async (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json({
        id: faker.random.number(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        is_active: false,
        is_authenticated: false,
      }),
    )
  }),
  rest.post(authUrl("users/activation/"), async (req, res, ctx) => {
    if (req.body.uid && req.body.token) {
      return res(ctx.delay(delay), ctx.status(204))
    }
    return res(ctx.delay(delay), ctx.status(400), ctx.json({ non_field_errors: ["invalid token"] }))
  }),
  rest.post(authUrl("users/reset_password/"), async (req, res, ctx) => {
    if (req.body.email) {
      return res(ctx.delay(delay), ctx.status(204))
    }
  }),
  rest.post(authUrl("users/reset_password_confirm/"), async (req, res, ctx) => {
    if (req.body.uid && req.body.token) {
      return res(ctx.delay(delay), ctx.status(204))
    }
    return res(ctx.delay(delay), ctx.status(400), ctx.json({ non_field_errors: ["invalid token"] }))
  }),

  // player handlers
  rest.get(apiUrl("players/"), async (req, res, ctx) => {
    const email = req.url.searchParams.get("email")
    console.log(`In handler with email: ${email}`)
    return res(ctx.delay(delay), ctx.json(buildPlayer()))
  }),
  rest.put(apiUrl("players/:playerId/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.status(204))
  }),

  // season registration handlers
  rest.get("http://test/api/events/1/", async (req, res, ctx) => {
    console("fetching event")
    return res(ctx.delay(delay), ctx.json(testSeasonRegistrationEvent))
  }),
  rest.get(apiUrl("registration/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), [])
  }),
  rest.get(apiUrl("payments/"), async (req, res, ctx) => {
    return res(ctx.delay(delay), [])
  }),
]

export { handlers }