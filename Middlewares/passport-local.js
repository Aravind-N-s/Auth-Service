const passport = require('passport')
const {User} = require('../Models/User')
const bcryptjs = require('bcryptjs')
const options ={
    usernameField: 'email',
    passwordField: 'password'
}

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(options,(email, password, done) => {
    User.findOne({email})
    .then(user =>{
        if(!user){
            return done(null,'error')
        }
        bcryptjs.compare(password, user.password)
        .then(result => {
            if (result) {return done(null, user)}
            consoele.log(result,'passport')
            done()
        })
        .catch(err => {return done(err)})
    })
}))