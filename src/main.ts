import Fastify from "fastify"
import { config } from "dotenv"

// init env
config()

const fastify = Fastify({
  logger: true,
})

fastify.ready(function () {
  console.log(fastify.printRoutes)
})

async function start() {
  fastify.listen({ port: Number(process.env.Port), host: process.env.Host })
}

start()
