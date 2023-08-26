import { type FastifyInstance } from "fastify"
import * as roomEndpoints from "../../endpoints/room"

export async function jwtRoutes(fastify: FastifyInstance, opts, done) {
  // get user rooms info
  fastify.post("/rooms/v1", { ...opts, ...roomEndpoints.getRoomsV1Options })

  // get rooms info by username
  fastify.post("/room/info/v1", { ...opts, ...roomEndpoints.getRoomInfoByRoomIdV1Options })

  // create room
  fastify.post("/create-room/v1", { ...opts, ...roomEndpoints.createRoomV1Options })

  // delete room
  fastify.post("/delete-room/v1", { ...opts, ...roomEndpoints.deleteRoomV1Options })

  done()
}
