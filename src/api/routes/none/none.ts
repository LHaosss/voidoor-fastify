import { type FastifyInstance } from "fastify"
import * as userEndpoints from "../../endpoints/user"

export async function noneRoutes(fastify: FastifyInstance, opts, done) {
  // register
  fastify.post("/register/v1", { ...opts, ...userEndpoints.registerV1Options })
  // login
  fastify.post("/login/v1", { ...opts, ...userEndpoints.loginV1Options })

  done()
}
