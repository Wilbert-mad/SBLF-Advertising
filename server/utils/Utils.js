'use strict';
/* eslint-disable no-useless-escape */

// app data 
const application = require('../../application.js');
const { client } = require('../bot');

// set app icon
const icon = application.appIcon.match(new RegExp(/(?!\"|\')(http|https):\/\/[a-z0-9\-\.\/]+\.(?:jpe?g|png)(?!\"|\')/g)) ? 
  application.appIcon.match(new RegExp(/(?!\"|\')(http|https):\/\/[a-z0-9\-\.\/]+\.(?:jpe?g|png)(?!\"|\')/g)) : application.appIcon;

let renderTitle;
const RenderTemplate = (req, res, template, data = {}, title = {}) => {
  if (title.title && title.extend) renderTitle = `${application.name} - ${title.title}`;
  else if (title.title && !title.extend) renderTitle = title.title;
  else renderTitle = application.name;
  const BaseData = {
    login: req.isAuthenticated() ? true : false,
    title: renderTitle,
    app: application,
    client,
    icon,
  };
  res.render(template, Object.assign(BaseData, data));
};

module.exports = {
  RenderTemplate
};
