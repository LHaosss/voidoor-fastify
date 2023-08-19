import { RouteShorthandOptionsWithHandler } from "fastify"

export const createRoomV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("createRoomV1Options")
    return {
      status: "OK",
    }
  },
}
