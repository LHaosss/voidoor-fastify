import { FastifyInstance, FastifyRequest } from "fastify"
import fp from "fastify-plugin"
import jwt from "@fastify/jwt"
import { config } from "dotenv"
import CustomError, { CustomErrorsKeys } from "../../errors/errors"

config()

export const jwtPlugin = fp(async function (server: FastifyInstance) {
  server.register(jwt, {
    secret: process.env.Secret,
    cookie: {
      cookieName: "refreshToken",
      signed: false,
    },
    sign: {
      expiresIn: "20m",
    },
  })

  server.decorate("authenticate"),
    async function (request: FastifyRequest, reply, done) {
      // check whether token and refreshToken exist
      if (!request.headers?.authorization || !request.cookies?.refreshToken) {
        const customError = new CustomError(
          CustomErrorsKeys.ErrTokenDoesNotExist,
          "Token or refreshToek do not exist, please check authorizate in request header or cookie.",
        )
        done(customError.NewError())
      }

      // verify token and refreshToken
      try {
        // verify token
        await request.jwtVerify()
        await request.jwtVerify({ onlyCookie: true })
      } catch (err) {
        if (err.ErrorCode === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
          try {
            // verify refreshToken
            await request.jwtVerify({ onlyCookie: true })
            const customError = new CustomError(
              CustomErrorsKeys.ErrTokenExpired,
              "Token expired, please reacquire new token.",
            )
            done(customError.NewError())
          } catch {
            const customError = new CustomError(
              CustomErrorsKeys.ErrRefreshTokenVerifyFailed,
              "RefreshToken verification failed, please login again.",
            )
            done(customError.NewError())
          }
        } else {
          const customError = new CustomError(
            CustomErrorsKeys.ErrTokenVerifyFailed,
            "Token verification failed, please login again.",
          )
          done(customError.NewError())
        }
      }
    }
})
