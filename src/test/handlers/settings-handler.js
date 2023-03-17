import { rest } from "msw"
import { apiUrl } from "utils/client-utils"

const delay = process.env.NODE_ENV === "test" ? 0 : 1500

const handlers = [
  rest.get(apiUrl("settings/"), async (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.json([
        { season: 2021, member_event: 1, match_play_event: 2, is_active: true },
        { season: 2020, member_event: -1, match_play_event: -2, is_active: false },
      ]),
    )
  }),
]

export { handlers }
