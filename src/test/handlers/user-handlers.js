import * as faker from "faker"
import { rest } from "msw"
import { buildUser } from "test/data/auth"
import { authUrl } from "utils/client-utils"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [
  rest.post(authUrl("token/login/"), async (request, response, context) => {
    return response(
      context.delay(delay),
      context.json({ auth_token: faker.random.alphaNumeric(12) }),
    )
  }),
  rest.get(authUrl("users/me/"), async (request, response, context) => {
    return response(context.delay(delay), context.json(buildUser()))
  }),
  rest.post(authUrl("users/"), async (request, response, context) => {
    const body = await request.json()
    return response(
      context.delay(delay),
      context.json({
        id: faker.datatype.number(),
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        is_active: false,
        is_authenticated: false,
      }),
    )
  }),
  rest.post(authUrl("users/activation/"), async (request, response, context) => {
    const body = await request.json()
    if (body.uid && body.token) {
      return response(context.delay(delay), context.status(204))
    }
    return response(
      context.delay(delay),
      context.status(400),
      context.json({ non_field_errors: ["invalid token"] }),
    )
  }),
  rest.post(authUrl("users/reset_password/"), async (request, response, context) => {
    const body = await request.json()
    if (body.email) {
      return response(context.delay(delay), context.status(204))
    }
  }),
  rest.post(authUrl("users/reset_password_confirm/"), async (request, response, context) => {
    const body = await request.json()
    if (body.uid && body.token) {
      return response(context.delay(delay), context.status(204))
    }
    return response(
      context.delay(delay),
      context.status(400),
      context.json({ non_field_errors: ["invalid token"] }),
    )
  }),
]

export { handlers }
