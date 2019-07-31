/*
    Series Organizer - Database Models
    Model: User
    Basic user model to store informations for login and sending e-mails functionality
    
    username--> SignUp/Login
    email-----> SignUp/Login/Sending emails
    password--> SignUp/Login
*/


const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.lenth > 15) {throw new Error('Username is to long')}
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {throw new Error('e-mail is invalid')}
        }
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = User