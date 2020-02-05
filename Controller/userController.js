const _ = require('lodash')
require('dotenv').config
const jwt = require('jsonwebtoken')
const { User } = require('../Models/User')

//localhost:3005/users/register
module.exports.register =  (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
    .then(user => {
        res.json(user)
    })
    .catch(err =>{
        res.send(err)
    })
}

//localhost:3005/users/login
module.exports.login =  (req,res) =>{
    console.log(req.body,'req')
    const user = req.user
    if(user !== 'error'){
        const tokenData = {
            _id:user._id,
            username: user.username,
            createdAt: Number(new Date())
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET)
        res.json({token})
    }
    else{
        res.json('Invalid Email and Password')
    }  
}

//localhost:3005/users/account
module.exports.account =  (req,res)=>{
    const {user} = req
    res.send(_.pick(user, ['_id','username','email']))
}

//localhost:3005/users/info
module.exports.info =  (req,res) =>{
    const {user} = req
    User.find()
    .then((users) => {
       res.json(users.map(usr =>{
        if(usr.id != user._id){return(_.pick(usr,['_id','email']))} 
        else{return(false)}
        })) 
    })
    .catch((err) => {
        res.send(err)
    })
}

module.exports.logout =  (req,res) =>{
    // const { user} = req
    // User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
    //     .then(function(){
    //         res.send({notice:'successfully logged out'})
    //     })
    //     .catch(function(err){
    //         res.send(err)
    //     })
    res.json('User is logged Out')
}
