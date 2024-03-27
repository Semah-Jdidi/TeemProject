const Idea = require('../models/idea.model');
const User=require('../models/user.model')
const jwt = require('jsonwebtoken');
module.exports = {
  createIdea: async (req, res) => {
    try {
      const { content } = req.body;
      jwt.verify(req.cookies.token, process.env.SECRET_KEY, async(err, payload) => {
        if (err) { 
           res.status(401).json({verified: false});
        } else {
          const author=payload._id
          const name=payload.alias
          const newIdea = await Idea.create({content, author,name});
          res.status(201).json(newIdea);
        }
      })
    } 
    catch (error) {
      res.status(400).json(error);
    }
  },
  findideas: async (req, res) => {
    try{
      const idea = await Idea.find()
      res.status(200).json(idea)
    }
    catch(error){
      res.status(400).json(error)
    }
  },
  like: async (req, res) => {
    try{
      const userid=req.body.userid
      const idea = await Idea.findOne({ _id: req.body.postid});
      if (idea.likes.includes(userid)) {
        const updatedIdea =await Idea.findOneAndUpdate({_id:req.body.postid}, { $inc: { likesCount: 1 } },{new:true})
        res.json(updatedIdea )
      }
      else{
        const updatedIdea =await Idea.findOneAndUpdate({_id:req.body.postid}, { $push: { likes: userid }, $inc: { likesCount: 1 } },{new:true})
        res.json(updatedIdea )
      }

    }
    catch(error){
      res.status(400).json(error)
    }
  },
  findoneidea:async (req, res) => {
    try{
      const idea = await Idea.findOne({_id: req.params.id})
      const users=[]
      for (let i = 0; i < idea.likes.length; i++){
        const user=await User.findOne({_id:idea.likes[i]})
        users.push(user)
      }
      
      res.status(200).json({idea,users})
    }
    catch(error){
      res.status(400).json(error)
    }
  },
  userinfo:async (req, res) => {
    try{
      const ideas = await Idea.find({author: req.params.id})
      let likes=0
      const posts=ideas.length
      for (let i = 0; i < ideas.length; i++){
        likes+=ideas[i].likesCount
      }
      const user= await User.findOne({_id:req.params.id})
      res.status(200).json({likes,posts,user})
    }
    catch(error){
      res.status(400).json(error)
    }
  },
}