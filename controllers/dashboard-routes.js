const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('models');
const withAuth = require('../untils/auth');
router.get('/', withAuth, (req, res) => {

});