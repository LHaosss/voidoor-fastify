import { RouteShorthandOptionsWithHandler } from "fastify"

export const getRoomsV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("getRoomsV1Options")
    return {
      status: "OK",
    }
  },
}
