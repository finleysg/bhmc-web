import { build, fake, oneOf, sequence } from "@jackfranklin/test-data-bot"

const buildPlayer = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: sequence((n) => n + 10),
    ghin: fake((f) => f.random.alphaNumeric(7)),
    birth_date: fake((f) => f.date.past()),
    phone_number: fake((f) => f.phone.phoneNumber()),
    tee: oneOf("Club", "Gold"),
    profile_picture: {
      thumbnail_url: fake((f) => f.image.avatar()),
    },
  },
})

const buildPlayers = build({
  postBuild: (players) => {
    players = Array(10).map((_) => buildPlayer())
    return players
  },
})

export { buildPlayer, buildPlayers }
