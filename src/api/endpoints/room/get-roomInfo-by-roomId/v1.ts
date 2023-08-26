import { FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { PrismaClient } from "@prisma/client"

export const getRoomInfoByRoomIdV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest) {
    // verify params
    if (!request.body["user_id"] || !request.body["room_id"]) {
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

      // search room info from db
      const room = await pgClient.room.findUnique({
        where: {
          roomId: request.body["room_id"],
        },
      })

      const mapMetadates = []
      const result = await pgClient.mapMetadate.findMany({
        where: {
          roomId: room.roomId,
        },
      })

      console.log(result)

      result.forEach((r) => {
        mapMetadates.push({
          map_id: r.mapId,
          node_wid: r.nodeWid,
          node_hei: r.nodeHei,
          background: r.background,
          materials_url: r.materialsUrl,
          text_url: r.textUrl,
          mini_map_url: r.miniMapUrl,
          materials: r.materials,
          privacy_arr_list: r.privacyArrList,
          birth_point: r.birthPoint,
          road_arr: r.roadArr,
          is_main: r.isMain,
          teleport_data: r.teleportData,
          children_map: r.childrenMap,
          json_directory: r.jsonDirectory,
          room_id: r.roomId,
        })
      })

      return {
        room_info: {
          room_id: room.roomId,
          room_name: room.roomName,
          info: room.info,
          user_id: room.userId,
          map_metadata: mapMetadates,
        },
      }
    } catch (err) {
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Unexpect error occurs.")
      return customError
    }
  },
}
