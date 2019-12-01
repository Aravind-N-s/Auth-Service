//db configuration
const mongoose = require('mongoose')
require('dotenv').config()
//connect express to mongo via mongoose
//config the promise lib to be ES6 Promise
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const CONNECTION_URI = process.env.MONGODB_URI

//connect to db
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch((err) => {
        console.log('ERROR connected to DB', err)
    })

module.exports = {
    mongoose
}
//single value sent module.exports = mongoose