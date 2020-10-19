
const app = require('express')()
const Parse = require('parse-server').ParseServer

// Parse config
const api = new Parse({
    databaseURI: process.env.PARSE_DB_URI,
    appId: process.env.PARSE_APP_ID,
    masterKey: process.env.PARSE_MASTER_KEY,
    serverURL: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/parse`,
    liveQuery: {
        classNames: ['movie']
    }
})

// Routers import
const movies = require("./routes/movies")
const auth = require("./routes/auth")

// Middlewares import
const body_parser = require("body-parser")
const page_not_found = require('./middlewares/page_not_found')
const exception_handler = require('./middlewares/exception_handler')

// Server prepare
app.use('/parse', api)
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

// Routes adding
app.use('/auth', auth)
app.use('/movies', movies)
app.get("/", (req, res, next) => res.send("Bem vindo à MobApps Movies API"))

// Middleware adding to request end
app.use(page_not_found)
app.use(exception_handler)
    
module.exports = app