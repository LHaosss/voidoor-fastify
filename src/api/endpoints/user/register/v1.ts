import { RouteShorthandOptionsWithHandler } from "fastify"

export const registerV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("registerV1Options")
    return {
      status: "OK",
    }
  },
}
