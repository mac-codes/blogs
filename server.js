const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const { Sequelize } = require('sequelize');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//set up handlebars
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new sequelizeStore({
    db: Sequelize
  })
};

app.use(session(sess));