const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET_KEY;

module.exports = {
  registerUser: async (req, res) => {

    //try to find users with the req.body.email and if it return false return this =>
    try{
      const newUser = await User.create(req.body)
      const token = jwt.sign({_id: newUser._id ,alias: newUser.alias}, secret, {expiresIn: '2h'})
      res.status(201).cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json({_id: newUser._id, alias: newUser.alias, email: newUser.email, token});
    }
    catch(error){ res.status(400).json(error) }
  },

  loginUser: async (req, res) => {
    try{
      const {email, password} = req.body
      const user = await User.findOne({email})
      if(user){
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch){
          const token = jwt.sign({_id: user._id,alias: user.alias}, secret, {expiresIn: '2h'} )
          res.cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json({_id: user._id, alias: user.alias, email, token});
        }else{
          res.status(400).json({message: "Invalid Password!"})
        }
      }else{
        res.status(400).json({message: "Email doesn't exist!"})
      }
    }
    catch(error){ res.status(400).json(error) }
  },
 
  findUser: async (req, res) => {
    const {_id} = req.params;
    try{
      const user = await User.findOne(_id)
      res.status(200).json(user)
    }
    catch(error){
      res.status(400).json(error)
    }
  },
  findUsers: async (req, res) => {

    try{
      const user = await User.find()
      res.status(200).json(user)
    }
    catch(error){
      res.status(400).json(error)
    }
  },
  findlogeduser: async (req, res) => {

    try{
      jwt.verify(req.cookies.token, process.env.SECRET_KEY, async(err, payload) => {
        if (err) { 
           res.status(401).json({verified: false});
        } else {
          res.status(201).json(payload);
        }
      })
    }
    catch(error){
      res.status(400).json(error)
    }
  },

  logout: (req, res) => res.clearCookie('token').json({message: "You Logged Out!"}),

};