express = require('express')
routes = require('./routes')
app = module.exports = express.createServer()
connections = []

app.configure = ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser()
  app.use express.session { secret: 'your secret here' }
  app.use app.router
  app.use express.static __dirname + '/public'

app.configure 'development', ->
  app.use express.errorHandler { 
    dumpExceptions: true
    showStack: true
  }

app.configure 'production', ->
  app.use express.errorHandler() 

app.get '/', routes.index

app.listen 3000
console.log "Express server listening on port #{app.address().port}"

io = require('socket.io').listen app

io.sockets.on 'connection', (socket)->
  socket.on 'upload', (data)->
    console.log data
    io.sockets.emit 'download', {x: data.x, y: data.y}
  
  socket.on 'logged in', (data)->
    connections.push {
      twitter_id: data.twitter_id
      id: socket.id
    }
