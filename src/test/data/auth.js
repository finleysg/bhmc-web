import {
  build,
  fake,
} from "@jackfranklin/test-data-bot"

import * as faker from "faker"

const password = faker.internet.password()

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

const buildAdminUser = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: fake((f) => f.random.number()),
    is_active: true,
    is_authenticated: true,
    is_staff: true,
  },
})

const buildUserWithToken = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    id: fake((f) => f.random.number()),
    is_active: true,
    is_authenticated: true,
    is_staff: false,
    token: fake((f) => f.random.uuid()),
  },
})

const buildRegisterForm = build({
  fields: {
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.email()),
    ghin: fake((f) => f.random.number(7).toString()),
    password: password,
    re_password: password,
  },
})

export { buildAdminUser, buildLoginForm, buildRegisterForm, buildUser, buildUserWithToken }
