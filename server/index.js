/* eslint-disable no-useless-escape */
const express = require('express');

// temp asset
const application = {
  // app name
  name: 'SBLF-Advertising',
  // owner of this app
  owner: 'Xa_puppet',
  // apps icon ( can be link e.g: 'https://link...' or static img path e.g: '/img/icon.PNG')
  appIcon: '/img/icon.png'
};

require('dotenv').config();
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup template engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// static and engine templates path
app.use(express.static(path.join(__dirname, '../client/static/')));
app.set('views', path.join(__dirname, '../client/templates/'));

// set app icon
const icon = application.appIcon.match(new RegExp(/(?!\"|\')(http|https):\/\/[a-z0-9\-\.\/]+\.(?:jpe?g|png)(?!\"|\')/g)) ? 
  application.appIcon.match(new RegExp(/(?!\"|\')(http|https):\/\/[a-z0-9\-\.\/]+\.(?:jpe?g|png)(?!\"|\')/g)) : application.appIcon;

let renderTitle;
const RenderTemplate = (req, res, template, data = {}, title = {}) => {
  if (title.title && title.extend) renderTitle = `${application.name} - ${title.title}`;
  else if (title.title && !title.extend) renderTitle = title.title;
  else renderTitle = application.name;
  const BaseData = {
    title: renderTitle,
    app: application,
    icon
  };
  res.render(template, Object.assign(BaseData, data));
};

app.get('/', (req, res) => {
  RenderTemplate(req, res, 'index');
});

// app.get('*', (req, res, next) => {});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`http://localhost:${port}`));
