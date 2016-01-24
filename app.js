var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var loadUser = require('./middleware/loadUser');





require('dotenv').load();

var app = express();
// ====aleksa staff=====
var server = require('http').Server(app);
var socketIo = require('socket.io');
var io = socketIo(server);
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data,
      // img: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

// =====aleksa staff ends=====

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/otterstream-2');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(loadUser);


var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var ottersRouter = require('./routes/api/otters');
var usersRouter = require('./routes/api/users');


app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/api/otters', ottersRouter);
app.use('/api/users', usersRouter);


//aleksa change app => server
server.listen(process.env.PORT || 3000, function(){
  console.log('...listening on 3000');
})
