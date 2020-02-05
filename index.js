require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const passport = require('passport')
const router = require('./Config/routes')

const port = process.env.PORT

app.use(passport.initialize())

require('./Middlewares/passport-local')
require('./Middlewares/passport-jwt')

app.use(express.json())
app.use(cors())

app.use('/user', router)


app.listen(port ,() =>{
    console.log('Listening on port', port)
})
