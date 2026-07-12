var express = require('express');
var session = require('express-session')
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require("fs");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require("log4js");

var init_db = require('./model/init_db');
var login = require('./routes/login');
var products = require('./routes/products');
var helmet = require('helmet');
var rateLimit = require('express-rate-limit');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const winston = require('winston');

const securityLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'security.log' })
  ]
});

securityLogger.info('Application started');

var app = express();
app.use(helmet({
  contentSecurityPolicy: {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    objectSrc: ["'none'"],
    frameAncestors: ["'self'"],
    formAction: ["'self'"],
    upgradeInsecureRequests: []
  }
},
  hsts: {
    maxAge: 15552000, // 180 days
    includeSubDomains: true,
    preload: false // set true only once you're ready to submit to the HSTS preload list
  }
}));
var globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." }
});
app.use(globalLimiter);
var corsOptions = {
  origin: 'https://localhost:3443', // restrict to your app's own origin
  credentials: true,                 // allow cookies/session to be sent
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

var JWT_SECRET = 'your-super-secret-jwt-key-2024';
app.set('JWT_SECRET', JWT_SECRET);

// config second logger
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('app-custom.log'), 'vnode');

var logger4js = log4js.getLogger('vnode');
logger4js.setLevel('INFO');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

/*
 * Template engine
 */
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('combined', {stream: accessLogStream}));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var csrfProtection = require('./middleware/csrf');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '├▒asddfilhpaf78h78032h780g780fg780asg780dsbovncubuyvqy',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 3600000 // 1 hour, instead of the previous ~3000-year session lifetime
  }
}));

/*
 * Routes config
 */
app.use('', products);
app.use('', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * Debug functions and error handlers
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
 * Create database
 */
logger4js.info("Building database")
// logger.info(("Building database");

init_db();

module.exports = app;
