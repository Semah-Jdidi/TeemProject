const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

module.exports = router => {
  router.get('/api/findUser/:id', userController.findUser);
  router.get('/api/logedin', userController.findlogeduser);
  router.get('/api/findUsers', userController.findUsers);
  router.post('/api/register', userController.registerUser);
  router.post('/api/login', userController.loginUser);
  router.post('/api/logout', userController.logout);
};