import { RouteShorthandOptionsWithHandler } from "fastify"

export const deleteRoomV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function () {
    console.log("deleteRoomV1Options")
    return {
      status: "OK",
    }
  },
}
