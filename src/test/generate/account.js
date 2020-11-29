import { build, fake } from "@jackfranklin/test-data-bot"

const buildPlayer = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: fake((f) => f.random.number()),
    ghin: fake((f) => f.random.alphaNumeric(7)),
    birth_date: fake((f) => f.date.past(45)),
    phone_number: fake((f) => f.phone.phoneNumber()),
    tee: "Club",
    profile_picture: {
      thumbnail_url: fake((f) => f.image.avatar()),
    },
  },
})

export { buildPlayer }
