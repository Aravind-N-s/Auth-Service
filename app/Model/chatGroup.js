const mongoose = require('mongoose')

//Schema - Object Constructor Function
const Schema = mongoose.Schema
const ChatSchema = new Schema({
    group:{
        type: String,
        required: true
    },
    description:{
        type: String,
        unique: true,
        required: true,
        unique: true
    },
    userAdmin:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participantsLevelTwo:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat
