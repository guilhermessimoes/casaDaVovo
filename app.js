var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const { flash } = require('express-flash-message');
const session = require('express-session');

var indexRouter = require('./routes/index');
var authRoutes = require('./routes/authRoutes');
var adminRouter = require('./routes/admin');
var pagamentoRouter = require('./routes/pagamento');
var carrinhoCompraRouter = require('./routes/carrinhoCompra');
var hotelRouter = require('./routes/hotel');
var passeioRouter = require('./routes/passeio');
var restauranteRouter = require('./routes/restaurante');
var transladoRouter = require('./routes/translado');

const app = express();

// express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/login', authRoutes);
app.use('/admin', adminRouter);
app.use('/pagamento', pagamentoRouter);
app.use('/carrinhoCompra', carrinhoCompraRouter);
app.use('/hotel', hotelRouter);
app.use('/passeio', passeioRouter);
app.use('/restaurante', restauranteRouter);
app.use('/translado', transladoRouter);


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
