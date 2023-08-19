import { RouteShorthandOptionsWithHandler } from "fastify"

export const getRoomsByIdV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("getRoomsByIdV1Options")
    return {
      status: "OK",
    }
  },
}
