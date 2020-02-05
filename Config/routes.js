const express = require ('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../Controller/userController')

//user
router.get('/test', function (req, res) {res.json('Test Successful')})
router.post('/register', userController.register)
router.post('/login',passport.authenticate('local',{session:false}),userController.login)
router.get('/account',passport.authenticate('jwt',{session:false}), userController.account)

module.exports = router