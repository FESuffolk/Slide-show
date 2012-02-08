(function() {
  var app, connections, express, io, routes;

  express = require('express');

  routes = require('./routes');

  app = module.exports = express.createServer();

  connections = [];

  app.configure = function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'your secret here'
    }));
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  };

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  app.listen(3000);

  console.log("Express server listening on port " + (app.address().port));

  io = require('socket.io').listen(app);

  io.sockets.on('connection', function(socket) {
    socket.on('upload', function(data) {
      console.log(data);
      return io.sockets.emit('download', {
        x: data.x,
        y: data.y
      });
    });
    return socket.on('logged in', function(data) {
      return connections.push({
        twitter_id: data.twitter_id,
        id: socket.id
      });
    });
  });

}).call(this);
