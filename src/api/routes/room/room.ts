import { type FastifyInstance } from "fastify"
import * as roomEndpoints from "../../endpoints/room"

export async function roomRoutes(fastify: FastifyInstance, opts, done) {
  // get user rooms info
  fastify.get("/rooms", { ...opts, ...roomEndpoints.getRoomsV1Options })

  // get rooms info by username
  fastify.get("/rooms/:username", { ...opts, ...roomEndpoints.getRoomsByIdV1Options })

  // create room
  fastify.post("/create-room", { ...opts, ...roomEndpoints.createRoomV1Options })

  // delete room
  fastify.post("/delete-room", { ...opts, ...roomEndpoints.deleteRoomV1Options })

  done()
}
