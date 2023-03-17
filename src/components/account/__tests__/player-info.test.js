import Player from "models/player"
import { rest } from "msw"
import { buildPlayer } from "test/data/account"
import { buildUserWithToken } from "test/data/auth"
import { server } from "test/test-server"
import { render, screen, waitForLoadingToFinish } from "test/test-utils"
import { apiUrl } from "utils/client-utils"

import { PlayerInfo } from "../player-info"

test("displays the current player's profile", async () => {
  const user = buildUserWithToken()
  const player = new Player(
    buildPlayer({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }),
  )

  server.use(
    rest.get(apiUrl("players/"), async (req, res, ctx) => {
      return res(ctx.json([player.obj]))
    }),
  )

  render(<PlayerInfo />, { user })

  await waitForLoadingToFinish()

  expect(screen.getByText(player.name)).toBeInTheDocument()
  expect(screen.getByText(player.email)).toBeInTheDocument()
  expect(screen.getByText(player.ghin)).toBeInTheDocument()
})
