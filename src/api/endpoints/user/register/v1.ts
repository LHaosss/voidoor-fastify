import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify"

export const registerV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest, reply: FastifyReply) {
    // verify query

    // logic
    return reply
  },
}
