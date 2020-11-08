import { build, fake } from "@jackfranklin/test-data-bot"

const buildLoginForm = build({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
})

const buildUser = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: fake((f) => f.random.number()),
    is_active: true,
    is_authenticated: true,
    is_staff: false,
  },
})

export { buildLoginForm, buildUser }
