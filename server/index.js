const express = require('express');
const { RenderTemplate } = require('./utils/Utils.js');

require('dotenv').config();
const app = express();
const path = require('path');

// connect to database
const connection = require('./database/connection.js');
connection.init();

// start up bot
const bot = require('./bot');
bot.init();

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
