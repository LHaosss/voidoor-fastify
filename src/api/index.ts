import { config } from "dotenv"
import { Server } from "./server"

// init env config
config()

export const start = async function () {
  try {
    const server = await Server()

    server.listen({ port: Number(process.env.Port), host: process.env.Host }, (err, addr) => {
      if (err) {
        console.log("err:", err)
        process.exit(1)
      }
      console.log(`listen at ${addr}`)
    })
  } catch (err) {
    console.log(err)
  }
}
