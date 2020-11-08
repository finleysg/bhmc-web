import * as faker from "faker"
import { rest } from "msw"

import { buildUser } from "./generate/auth"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500
const serverURL = process.env.REACT_APP_SERVER_URL

const handlers = [
  rest.post(`${serverURL}/auth/token/login`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json({ auth_token: faker.random.alphaNumeric(12) }))
  }),
  rest.get(`${serverURL}/auth/users/me`, async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(buildUser()))
  }),
]

export { handlers }
