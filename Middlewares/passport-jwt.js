require('dotenv').config()
const passport = require('passport')
const {User} = require('../Models/User')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey : process.env.TOKEN_SECRET
}
passport.use(
    new JWTStrategy(options,(jwtPayload,done) =>{
        User.findById({_id: jwtPayload._id})
        .then(user =>{
            if(user){
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => done(err))
    })
)