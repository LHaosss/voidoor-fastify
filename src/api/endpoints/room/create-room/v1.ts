import { RouteShorthandOptionsWithHandler, FastifyRequest } from "fastify"
import CustomError, { CustomErrorsKeys } from "../../../../errors/errors"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

export const createRoomV1Options: RouteShorthandOptionsWithHandler = {
  handler: async function (request: FastifyRequest) {
    // verify params
    if (
      !request.body["user_id"] ||
      !request.body["username"] ||
      !request.body["room_name"] ||
      !request.body["info"] ||
      !request.body["map_metadata"]
    ) {
      const customError = new CustomError(
        CustomErrorsKeys.ErrRequestParameterError,
        "Something wrong with your request's params, please check your request.",
      )
      return customError.NewError()
    }

    try {
      const pgClient: PrismaClient = this["pgClient"]

      const user = pgClient.user.findUnique({
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

      const room_id = uuidv4()
      console.log("room_id:", room_id)

      const createRoom = pgClient.room.create({
        data: {
          roomId: room_id,
          roomName: request.body["room_name"],
          info: request.body["info"],
          userId: request.body["user_id"],
        },
      })

      const data = []
      for (let i = 0; i < request.body["map_metadata"].length; i++) {
        data.push({
          mapId: uuidv4(),
          nodeWid: request.body["map_metadata"][i].node_wid,
          nodeHei: request.body["map_metadata"][i].node_hei,
          background: request.body["map_metadata"][i].background,
          materialsUrl: request.body["map_metadata"][i].materials_url,
          textUrl: request.body["map_metadata"][i].text_url,
          miniMapUrl: request.body["map_metadata"][i].mini_map_url,
          materials: request.body["map_metadata"][i].materials,
          privacyArrList: request.body["map_metadata"][i].privacy_arr_list,
          birthPoint: request.body["map_metadata"][i].birth_point,
          roadArr: request.body["map_metadata"][i].road_arr,
          isMain: request.body["map_metadata"][i].is_main,
          teleportData: request.body["map_metadata"][i].teleport_data,
          childrenMap: request.body["map_metadata"][i].children_map,
          jsonDirectory: request.body["map_metadata"][i].json_directory,
          roomId: room_id,
        })
      }

      const createMapDatas = pgClient.mapMetadate.createMany({
        data,
      })

      pgClient.$transaction([createRoom, createMapDatas])

      return {
        room_id,
      }
    } catch (err) {
      console.log("#err:", err)
      const customError = new CustomError(CustomErrorsKeys.ErrSomethingWrong, "Unexpect error occurs.")
      return customError
    }
  },
}
