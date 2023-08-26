import Fastify, { FastifyHttpOptions } from "fastify"
import http from "http"
import { routes } from "./routes"
import cookie from "@fastify/cookie"
import { jwtPlugin } from "../plugins/jwt/jwt"
import { pgPlugin } from "../plugins/pgClient/pgClient"

export const Server = async function (opts?: FastifyHttpOptions<http.Server> | undefined) {
  try {
    const server = await Fastify({
      logger: true,
      ...opts,
    })

    await server.register(pgPlugin)

    await server.register(cookie)

    await server.register(jwtPlugin)

    await server.register(routes)

    await server.ready(async function () {
      console.log(server.printRoutes())
    })

    return server
  } catch (err) {
    console.log("err:", err)
  }
}
