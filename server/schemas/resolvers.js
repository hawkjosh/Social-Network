const { AuthenticationError } = require('apollo-server-express')
const { User, Post } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({})
        .populate('username')
        .populate('email')
        .populate('github')
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId })
        .populate('posts')
    },
    currUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate('posts')
      }
      throw new AuthenticationError('You need to be logged in.')
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {}
      return await Post.find(params)
    },
    post: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId })
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password, github }) => {
      const user = await User.create({ username, email, password, github })
      const token = signToken(user)
      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new AuthenticationError('No user found with this email address.')
      }
      const correctPw = await user.isCorrectPassword(password)
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password')
      }
      const token = signToken(user)
      return { token, user }
    },
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        const post = await Post.create({
          postText,
          postAuthor: context.user.username
        })
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        )
        return post
      }
    },
    updatePost: async (parent, { _id, postText }) => {
      return await Post.findOneAndUpdate({ _id }, { postText }, { new: true })
    },
    removePost: async (parent, { postId }) => {
      return await Post.findOneAndDelete({ _id: postId })
    }
  }
}

module.exports = resolvers