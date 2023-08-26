import { FastifyInstance } from "fastify"
import { PrismaClient } from "@prisma/client"
import fp from "fastify-plugin"

export const pgClient = new PrismaClient()

export const pgPlugin = fp(async function (server: FastifyInstance) {
  server.decorate("pgClient", pgClient)
})
