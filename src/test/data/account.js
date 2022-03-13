import { build, fake, oneOf, sequence } from "@jackfranklin/test-data-bot"

const buildPlayer = build("Player", {
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: sequence((n) => n + 10),
    ghin: fake((f) => f.datatype.number(9999999).toString()),
    birth_date: fake((f) => f.date.past()),
    phone_number: fake((f) => f.phone.phoneNumber()),
    tee: oneOf("Club", "Gold"),
    profile_picture: {
      thumbnail_url: fake((f) => f.image.avatar()),
    },
  },
})

const buildPlayerFromUser = (user) => {
  return build({
    fields: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: sequence((n) => n + 10),
      ghin: fake((f) => f.datatype.number(9999999).toString()),
      birth_date: fake((f) => f.date.past()),
      phone_number: fake((f) => f.phone.phoneNumber()),
      tee: oneOf("Club", "Gold"),
      profile_picture: {
        thumbnail_url: fake((f) => f.image.avatar()),
      },
    },
  })
}

const buildPlayers = build({
  postBuild: (players) => {
    players = Array(10).map((_) => buildPlayer())
    return players
  },
})

const buildCard = build({
  fields: {
    id: fake((f) => f.random.alphaNumeric()),
    billing_details: {
      name: fake((f) => `${f.name.firstName()} ${f.name.lastName()}`),
    },
    card: {
      brand: oneOf("visa", "mastercard"),
      last4: fake((f) => f.datatype.number(1111, 5555, 1)).toString(),
      exp_month: fake((f) => f.date.month()),
      exp_year: fake((f) => f.date.future().getFullYear()),
    },
  },
})
// this.paymentMethod = json.id
// this.name = json.billing_details.name
// this.brand = json.card.brand
// this.last4 = json.card.last4
// this.card = `${json.card.brand} ending in ${json.card.last4}`
// this.expires = `${json.card.exp_month}/${json.card.exp_year}`
export { buildCard, buildPlayer, buildPlayerFromUser, buildPlayers }
