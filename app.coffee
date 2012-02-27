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

app.get '/notes', routes.notes

app.listen 3000
console.log "Express server listening on port #{app.address().port}"