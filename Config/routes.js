const express = require ('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../Controller/userController')

//user
router.get('/val', function (req, res) {
  res.json('Value')
})
router.post('/register', userController.register)
router.post('/login',passport.authenticate('local',{session:false}),userController.login)
router.get('/account',passport.authenticate('jwt',{session:false}), userController.account)
router.get('/info',passport.authenticate('jwt',{session:false}), userController.info)
router.delete('/logout',passport.authenticate('jwt',{session:false}), userController.logout)

module.exports = router