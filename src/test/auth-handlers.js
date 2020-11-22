import * as faker from "faker"
import { rest } from "msw"
import { authUrl } from "utils/client-utils"

import { buildUser } from "./generate/auth"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [
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
]

export { handlers }
