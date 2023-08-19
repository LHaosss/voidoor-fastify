import Fastify from "fastify"
import { config } from "dotenv"
import { routes } from "./routes"

// init env config
config()

export const start = async function () {
  const server = Fastify({
    logger: true,
  })

  server.register(routes)

  server.ready(function () {
    console.log(server.printRoutes)
  })

  server.listen({ port: Number(process.env.Port), host: process.env.Host })
}
