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
// const client = bot.client;
bot.init();

// user serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new Strategy({
  clientID: Application.botID,
  clientSecret: process.env.clientSecret,
  callbackURL: `${Application.BaseURL}/login`,
  scope: ['identify'],
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  process.nextTick(() => done(null, profile)); 
}));

// user info cookie
app.use(session({
  secret: process.env.Message_Secret,
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
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => RenderTemplate(req, res, 'index'));

app.get('/login', passport.authenticate('discord', { 
  failureRedirect: '/',
}), (req, res) => res.redirect('/'));

app.get('/logout', (req, res) => { 
  req.logout();
  res.redirect('/');
});

app.get('*', (req, res) => RenderTemplate(req, res, '404'));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
