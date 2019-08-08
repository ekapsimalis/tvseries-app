const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const serieSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    original_name: {type: String},
    overview: {type: String},
    poster:{type: String},
    genres: [String]
})

const userSchema = new mongoose.Schema({
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
    },
    series: [{
        type: serieSchema
    }]
})

userSchema.statics.verifyUser = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User