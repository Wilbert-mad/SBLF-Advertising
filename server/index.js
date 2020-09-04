const express = require('express');
const { RenderTemplate } = require('./utils/Utils.js');
const Application = require('../application.js');

require('dotenv').config();
const app = express();
const session  = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-discord');
const path = require('path');

// connect to database
// const connection = require('./database/connection.js');
// connection.init();

// start up bot
const bot = require('./bot');
const client = bot.Client;
bot.init();

// user serialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
  clientID: client.user.id,
  clientSecret: process.env.clientSecret,
  callbackURL: `${Application.BaseURL}/login`,
  scope: ['identify'],
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile)); 
}));

// user info cookie
app.use(session({
  secret: process.env.message_secret,
  cookie: { maxAge: 90000000 },
  saveUninitialized: false,
  resave: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup template engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// static and engine templates path
app.use(express.static(path.join(__dirname, '../client/static/')));
app.set('views', path.join(__dirname, '../client/templates/'));

app.get('/', (req, res) => RenderTemplate(req, res, 'index'));

app.get('*', (req, res) => RenderTemplate(req, res, '404'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
