import * as auth from "context/auth-provider"
import { rest, server } from "test/test-server"
import { client } from "utils/api-client"
import { apiUrl } from "utils/client-utils"

jest.mock("react-query")
jest.mock("context/auth-provider")

test("makes GET requests to the given endpoint", async () => {
  const endpoint = "test-endpoint"
  const mockResult = { value: "Trunalimunumaprzure!" }
  server.use(
    rest.get(apiUrl(endpoint), async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test("add auth token when a token is provided", async () => {
  const token = "trunalimunumaprzure"

  let request
  const endpoint = "test-endpoint"
  const mockResult = { value: "hello world" }
  server.use(
    rest.get(apiUrl(endpoint), async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, { token })
  expect(request.headers.get("Authorization")).toEqual(`Token ${token}`)
})

test("allows for config overrides", async () => {
  let request
  const endpoint = "test-endpoint"
  const mockResult = { value: "hello world" }
  server.use(
    rest.put(apiUrl(endpoint), async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  const customConfig = {
    method: "PUT",
    headers: { "Content-Type": "fake-type" },
  }
  await client(endpoint, customConfig)
  expect(request.headers.get("Content-Type")).toBe(customConfig.headers["Content-Type"])
})

test("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "test-endpoint"
  server.use(
    rest.post(apiUrl(endpoint), async (req, res, ctx) => {
      return res(ctx.json(req.body)) // echo the data passed in
    }),
  )

  const data = {
    foo: "bar",
  }
  const result = await client(endpoint, { data })

  expect(result).toEqual(data)
})

test("automatically logs the user out if the request returns a 401", async () => {
  const endpoint = "test-endpoint"
  const mockResult = { value: "Trunalimunumaprzure!" }
  server.use(
    rest.get(apiUrl(endpoint), async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint).catch((err) => err)

  expect(result.message).toMatchInlineSnapshot(`undefined`)
  expect(auth.logout).toHaveBeenCalledTimes(1)
})

test("rejects the promise if there is an error", async () => {
  const endpoint = "test-endpoint"
  const mockResult = { non_field_errors: ["Trunalimunumaprzure!"] }
  server.use(
    rest.get(apiUrl(endpoint), async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(mockResult))
    }),
  )

  await expect(client(endpoint)).rejects.toMatchSnapshot()
})
