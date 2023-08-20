import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import { noneRoutes } from "./none/none"
import { jwtRoutes } from "./jwt/jwt"

export const routes = fp(async function (server: FastifyInstance) {
  // none
  server.register(noneRoutes)

  // jwt
  server.register(jwtRoutes, { onRequest: [server["authenticate"]] })
})
