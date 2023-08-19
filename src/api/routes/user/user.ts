import { type FastifyInstance } from "fastify"
import * as userEndpoints from "../../endpoints/user"

export async function userRoutes(fastify: FastifyInstance, opts, done) {
  // register route
  fastify.post("/register", { ...opts, ...userEndpoints.registerV1Options })
  // login route
  fastify.post("login", { ...opts, ...userEndpoints.loginV1Options })

  done()
}
