const db = require('../config/connection')
const { User, Post } = require('../models')
const userSeeds = require('./userSeeds.json')
const postSeeds = require('./postSeeds.json')

db.once('open', async () => {
  try {
    await User.deleteMany({})
    await Post.deleteMany({})

    await User.create(userSeeds)
    await Post.create(postSeeds)

    console.log('Seeding successful!')
    process.exit(0)
  } catch (err) {
    throw err
  }
})