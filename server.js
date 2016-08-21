var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session = require('express-session');

// require our passport
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// required for passport
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
   secret: process.env.SESSION_SECRET || 'secret', // 'env' for production mode and 'secret' development
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// load our routes
require('./routes/routes')(app, passport);

app.listen(3000, function(){
   console.log('Listening on port 3000');
});