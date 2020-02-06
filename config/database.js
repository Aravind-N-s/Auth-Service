//db configuration
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

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