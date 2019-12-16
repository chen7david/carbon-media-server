const express = require('express')
const app = express()
const server = require('http').createServer(app)
const nunjucks = require('nunjucks')
const cors = require('cors')
const port = require('./config').APP_PORT || 4000
const {
    HomeRoutes, 
    MovieRoutes
} = require('./routes')

// Set app parameters
app.set('view engine', 'njk')

nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app
})

// allow thirdparty access
app.use(cors())

// Setup Routes
app.use(HomeRoutes)
app.use(MovieRoutes)

// Expose public directories
app.use('/media', express.static(__dirname + '/public/uploads'))
app.use('/assets',express.static(__dirname + '/public/assets'))

// Run server
server.listen(port, () => {
    console.log(`MediaServer is running at http://localhost:${port}`)
})