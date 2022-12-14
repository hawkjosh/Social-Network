import { once } from '../config/connection'
import { User, Post } from '../models'
import userSeeds from './userSeeds.json'
import postSeeds from './postSeeds.json'

once('open', async () => {
  await User.deleteMany({})
  await Post.deleteMany({})

  const users = await User.insertMany(userSeeds)
	const posts = await Post.insertMany(postSeeds)

	console.log('Seeding successful!')
	process.exit(0)
})