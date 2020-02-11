
const mongoose = require('mongoose')

require('dotenv').config()

const {consoleLogger, crashLogger} = require('../config/logger')
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const CONNECTION_URI = process.env.MONGODB_URI

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        consoleLogger.info('Connected to the DB')
    })
    .catch((err) => {
        consoleLogger.fatal('ERROR connected to DB', err)
        crashLogger.fatal('ERROR connected to DB', err)
    })

module.exports = {
    mongoose
}