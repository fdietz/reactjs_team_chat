"use strict";

var express        = require('express');
var bodyParser     = require('body-parser');
var logger         = require('morgan');
var methodOverride = require('method-override');
var multer         = require('multer');
var path           = require('path');
var _              = require('underscore');

var app            = express();
var http           = require('http').createServer(app);
var io             = require('socket.io').listen(http);

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// [
//  { session_id: "5W5f-HSzolBOjMj7AAAC", name: "Peter" },
//  { session_id: "YXlbm_LmHD7oUGwkAAAD", name: "Martin"}
// ]
var participants = [];
var messages     = [];

function mostRecentMessages() {
  return messages.slice(messages.length-20, messages.length);
}

app.get("/messages", function(request, response) {
  response.json(200, mostRecentMessages());
});

app.post("/messages", function(request, response) {
  var text = request.body.text;

  if(text && text.trim().length > 0) {
    var user_id    = request.body.user_id;
    var created_at = request.body.created_at;
    var user       = _.findWhere(participants, { id: user_id });
    var message    = { text: text, user: user, type: "message", created_at: created_at };

    messages.push(message);

    // let our chatroom know there was a new message, except the user who send the message
    clientSockets[user.id].broadcast.emit("message:added", { message: message });

    response.json(200, { message: message });
  } else {
    return response.json(400, { errors: { text: "Invalid message. Missing text param." } });
  }
});

var nameCounter = 1;

var clientSockets = {};

io.on("connection", function(socket) {
  socket.on("new_user", function(data) {
    console.log("ON new_user", data);

    var newName = "Guest " + nameCounter++;
    var user = { id: data.id, name: newName, initials: "FD" };
    participants.push(user);
    clientSockets[data.id] = socket;

    console.log("messages", messages, mostRecentMessages())

    io.sockets.emit("new_connection", {
      user: user,
      sender:"system",
      created_at: new Date().toISOString()
      // participants: participants
      // messages: mostRecentMessages()
    });

    io.sockets.emit("user:connected", { user: user, created_at: new Date().toISOString() });
  });

  socket.on("fetch", function(data) {
    console.log("ON fetch", data);

    io.sockets.emit("fetch_result", mostRecentMessages());
  });

  socket.on("name_change", function(data) {
    console.log("ON name_change", data);

    _.findWhere(participants, { id: socket.id }).name = data.name;
    io.sockets.emit("name_changed", { id: data.id, name: data.name });
  });

  socket.on("disconnect", function() {
    console.log("ON disconnect", socket.id);

    var participant = _.findWhere(participants, { id: socket.id });
    participants    = _.without(participants, participant);
    io.sockets.emit("user_disconnected", {
      user: participant,
      sender:"system",
      created_at: new Date().toISOString()
    });

    io.sockets.emit("user:disconnected", { user: participant, created_at: new Date().toISOString() });
  });
});

http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
