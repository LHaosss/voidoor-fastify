import { FastifyInstance } from "fastify"
import fp from "fastify-plugin"
import { noneRoutes } from "./none/none"
import { jwtRoutes } from "./jwt/jwt"

export const routes = fp(async function (fastify: FastifyInstance) {
  // none
  fastify.register(noneRoutes)

  // jwt
  fastify.register(jwtRoutes, { onRequest: fastify["authenticate"] }) //  { onRequest: [server["authenticate"]] }

  // auth
  fastify.get("/auth", { onRequest: fastify["authenticate"] }, async function (request) {
    console.log("token:", request.headers?.authorization)
    console.log("refreshToken:", request.cookies?.refreshToken)
    console.log("into auth #####")

    return {
      status: "OK",
    }
  })
})
