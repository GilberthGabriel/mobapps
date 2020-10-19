
const app = require('./src/app')
const http = require("http")
const parse = require("parse-server").ParseServer

const server = http.createServer(app)

server.listen(process.env.SERVER_PORT, () => {
    console.log("Server MobApps.desafio.backend running")
})

parse.createLiveQueryServer(server)
