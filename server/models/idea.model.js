const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "You Must Add An Idea To Submit!"],
    minLength: [5, "Content Must Be At Least 5 Characters!"]
  },
  name:{
    type:String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  likes:[String],

  likesCount: {
    type: Number,
    default: 0
  }

},{timestamps: true});

module.exports = mongoose.model('Idea', IdeaSchema);