const express = require("express")
const app = express.Router();
const {Attending} = require('../db')
const {isLoggedIn} = require('./middleware')

module.exports = app

app.post('/', isLoggedIn, async(req, res, next) => {
  try{
    res.send(await Attending.create(req.body))
  }catch(err){
    next(err)
  }
})