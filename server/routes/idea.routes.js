const ideaController = require('../controllers/idea.controller');
const authenticateUser = require('../middlewares/authenticateUser');
const express = require('express');
const router = express.Router();

module.exports = router => {
  router.get('/api/allideas',ideaController.findideas)
  router.get('/api/idea/:id',ideaController.findoneidea)
  router.get('/api/userinfo/:id',ideaController.userinfo)
  router.post('/api/idea/create', ideaController.createIdea);
  router.patch('/api/like',ideaController.like)
  router.delete('/api/deleteidea/:id',ideaController.deleteOne)

};