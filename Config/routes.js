const express = require ('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../app/Controller/userController')
const chatController = require('../app/Controller/chatController')

//user
router.get('/val', function (req, res) {
  res.json('Value')
})
router.post('/user/register', userController.register)
router.post('/user/login',passport.authenticate('local',{session:false}),userController.login)
router.get('/user/account',passport.authenticate('jwt',{session:false}), userController.account)
router.get('/user/info',passport.authenticate('jwt',{session:false}), userController.info)
router.delete('/user/logout',passport.authenticate('jwt',{session:false}), userController.logout)

//chat
router.get('/chat',passport.authenticate('jwt',{session:false}), chatController.list)
router.get('/chat/:id',passport.authenticate('jwt',{session:false}), chatController.show)
router.post('/chat',passport.authenticate('jwt',{session:false}), chatController.create)
router.put('/chat/:id',passport.authenticate('jwt',{session:false}), chatController.update)
router.delete('/chat/:id',passport.authenticate('jwt',{session:false}), chatController.destroy)

module.exports = router