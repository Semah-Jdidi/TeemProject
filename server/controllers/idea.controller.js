const Idea = require('../models/idea.model');

module.exports = {
  createIdea: async (req, res) => {
    try {
      const { content } = req.body;
      const author = req.user._id
      const newIdea = await Idea.create({content, author});
      res.status(201).json(newIdea);
    } 
    catch (error) {
      res.status(400).json(error);
    }
  },


}