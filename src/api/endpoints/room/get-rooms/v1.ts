import { RouteShorthandOptionsWithHandler, FastifyRequest } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { PrismaClient } from "@prisma/client"

export const getRoomsV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest) {
    // verify params
    if (!request.body["user_id"]) {
      const customError = new CustomError(
        CustomErrorsKeys.ErrRequestParameterError,
        "Something wrong with your request, please check your request again.",
      )
      return customError.NewError()
    }

    try {
      // verify user is existing
      const pgClient: PrismaClient = this["pgClient"]

      const user = await pgClient.user.findUnique({
        where: {
          userId: request.body["user_id"],
        },
      })

      if (!user) {
        const customError = new CustomError(
          CustomErrorsKeys.ErrUserNotExists,
          "User does not exist, please check user.",
        )
        return customError.NewError()
      }

      // find rooms in db
      const rooms = []
      const result = await pgClient.room.findMany({
        where: {
          userId: request.body["user_id"],
        },
      })

      result.forEach((r) => {
        rooms.push({
          room_id: r.roomId,
          room_name: r.roomName,
          info: r.info,
          user_id: r.userId,
        })
      })

      return { rooms }
    } catch (err) {
      console.log("#err:", err)
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Unexpect error occurs.")
      return customError.NewError()
    }
  },
}
