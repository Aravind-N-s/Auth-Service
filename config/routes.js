const express = require ('express')
const router = express.Router()
const passport = require('passport')
const usercontroller = require('../controller')

//user
router.post('/register', usercontroller.register)
router.post('/login',passport.authenticate('local',{session:false}),usercontroller.login)
// router.put('/account/edit',passport.authenticate('local',{session: false}), usercontroller)
router.get('/account',passport.authenticate('jwt',{session:false}), usercontroller.account)

module.exports = router