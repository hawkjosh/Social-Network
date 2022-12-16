const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const isEmail = require('validator/lib/isEmail')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Please enter a valid email address']
  },
  github: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User