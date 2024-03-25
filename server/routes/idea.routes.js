const ideaController = require('../controllers/idea.controller');
const authenticateUser = require('../middlewares/authenticateUser');
const express = require('express');
const router = express.Router();

module.exports = router => {
  router.use(authenticateUser)

  router.post('/api/idea/create', ideaController.createIdea);
};