import Fastify, { FastifyHttpOptions } from "fastify"
import http from "http"
import { routes } from "./routes"
import mysql from "@fastify/mysql"
import cookie from "@fastify/cookie"
import { jwtPlugin } from "../plugins/jwt/jwt"

export const Server = async function (opts?: FastifyHttpOptions<http.Server> | undefined) {
  const server = await Fastify({
    logger: true,
    ...opts,
  })

  await server.register(cookie)

  await server.register(jwtPlugin)

  await server.register(mysql)

  await server.register(routes)

  await server.ready(async function () {
    console.log(server.printRoutes())
  })

  return server
}
