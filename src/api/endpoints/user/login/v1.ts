import { RouteShorthandOptionsWithHandler } from "fastify"

export const loginV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("loginV1Options")
    return {
      status: "OK",
    }
  },
}
