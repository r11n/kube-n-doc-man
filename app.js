var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var expressWs = require('express-ws')(app);
var pty = require('node-pty');
var os = require('os');
var shellType = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// socket com for terminal
app.ws('/bash', function (ws, req) {
  var shell = pty.spawn(shellType, [], {
    name: 'xterm-color',
    cwd: process.env.HOME,
    env: process.env
  });
  shell.on('data', function (data) {
    ws.send(data);
  });
  ws.on('message', function (msg) {
    shell.write(msg);
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// libs setup
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/materialize', express.static(path.join(__dirname, 'node_modules/materialize-css/dist/')));
app.use('/xterm', express.static(path.join(__dirname, 'node_modules/xterm/dist')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// route config
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
