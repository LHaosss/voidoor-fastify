import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import { userRoutes } from "./user/user"
import { roomRoutes } from "./room/room"

export const routes = fp(async function (server: FastifyInstance) {
  // register user routes
  server.register(userRoutes, { prefix: "/v1" })

  // register room routes
  server.register(roomRoutes, { prefix: "/v1", onReqeust: [server["authenticate"]] })
})
