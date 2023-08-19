import { start } from "./api"

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection, err: ${err}`)
})

const setup = async () => {}

setup().then(() => start())
