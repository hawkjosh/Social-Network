const db = require('../config/connection')
const { User, Post } = require('../models')
const userSeeds = require('./userSeeds.json')
const postSeeds = require('./postSeeds.json')

db.once('open', async () => {
  await User.deleteMany({})
  await Post.deleteMany({})

  const users = await User.insertMany(userSeeds)
	const posts = await Post.insertMany(postSeeds)

	console.log('Seeding successful!')
	process.exit(0)
})