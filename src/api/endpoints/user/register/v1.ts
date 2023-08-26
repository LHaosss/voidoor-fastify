import { FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

export const registerV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest) {
    // verify params
    if (
      !request.body["username"] ||
      !request.body["password"] ||
      !request.body["re_password"] ||
      request.body["password"] != request.body["re_password"]
    ) {
      const customError = new CustomError(
        CustomErrorsKeys.ErrRequestParameterError,
        "Something wrong with request's params, please check your request again.",
      )
      return customError.NewError()
    }

    try {
      console.log("request incoming")
      // verify the user does not exist.
      const pgClient: PrismaClient = this["pgClient"]
      console.log("sssss")

      const result = await pgClient.user.findUnique({
        where: {
          username: request.body["username"],
        },
      })

      if (result) {
        const customError = new CustomError(
          CustomErrorsKeys.ErrUserAlreadyExists,
          "User exists, please use new username.",
        )
        return customError.NewError()
      }

      // create new user
      await pgClient.user.create({
        data: {
          userId: uuidv4(),
          username: request.body["username"],
          password: request.body["password"],
        },
      })

      const user = await pgClient.user.findUnique({
        where: {
          username: request.body["username"],
        },
      })

      console.log(`create user:
        ${user} success.`)

      return {
        status: "OK",
      }
    } catch (err) {
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Upexpect error occurs.")
      return customError.NewError()
    }
  },
}
