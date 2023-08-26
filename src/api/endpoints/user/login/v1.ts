import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { PrismaClient } from "@prisma/client"

export const loginV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest, reply: FastifyReply) {
    // verify params
    if (!request.body["username"] || !request.body["password"]) {
      const customError = new CustomError(
        CustomErrorsKeys.ErrRequestParameterError,
        "Something wrong with your request, please check your request again.",
      )
      return customError.NewError()
    }

    try {
      // get postgres client
      const pgClient: PrismaClient = this["pgClient"]
      // verify user
      const user = await pgClient.user.findUnique({
        where: {
          username: request.body["username"],
        },
      })

      if (!user) {
        const customError = new CustomError(
          CustomErrorsKeys.ErrUserNotExists,
          "User does not exist, please check your username.",
        )
        return customError.NewError()
      }

      // generate token and refreshToken
      const token = await reply.jwtSign({
        user_id: user.userId,
        username: user.username,
        type: "token",
      })

      const refreshToken = await reply.jwtSign({
        user_id: user.userId,
        username: user.username,
        type: "refreshToken",
      })

      reply.setCookie("refreshToken", refreshToken)

      return {
        user_id: user.userId,
        username: user.username,
        token: token,
      }
    } catch (err) {
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Unexcept error occurs.")
      return customError.NewError()
    }
  },
}
