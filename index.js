require('dotenv').config()
const {mongoose} = require('./config/database')
const port = process.env.PORT
const express = require('express')

const cors = require('cors')
const app = express()
const passport = require('passport')

const router = require('./config/routes')

app.use(express.json())
app.use(cors())

app.use(passport.initialize())

require('./middlewares/passport-local')

require('./middlewares/passport-jwt')

app.get('/', (req, res) => {
    res.send('.Welcome to Auth Services.')
})
app.use('/user', router)

app.listen(port ,() =>{
    console.log('Listening on port', port)
})
