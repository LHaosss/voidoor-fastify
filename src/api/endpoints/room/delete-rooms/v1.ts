import { FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { MapMetadate, PrismaClient } from "@prisma/client"

export const deleteRoomV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest) {
    // verify params
    if (!request.body["user_id"] || !request.body["rooms_id"] || request.body["rooms_id"].length <= 0) {
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

      //  find all relation maps in db
      const maps: MapMetadate[] = await pgClient.mapMetadate.findMany({
        where: {
          roomId: request.body["room_id"],
        },
      })

      const maps_id = []

      for (let i = 0; i < maps.length; i++) {
        maps_id.push(maps[i].mapId)
      }

      const deleteMapdatas = pgClient.mapMetadate.deleteMany({
        where: {
          mapId: {
            in: maps_id,
          },
        },
      })

      // remove room
      const deleteRoom = pgClient.room.deleteMany({
        where: {
          roomId: {
            in: [...request.body["rooms_id"]],
          },
        },
      })

      await pgClient.$transaction([deleteMapdatas, deleteRoom])

      return {
        rooms_id: request.body["rooms_id"],
      }
    } catch (err) {
      console.log("#err:", err)
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Unexpect error occurs.")
      return customError
    }
  },
}
