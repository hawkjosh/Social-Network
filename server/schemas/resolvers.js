import { AuthenticationError } from 'apollo-server-express'
import { User, Post } from '../models'
import { signToken } from '../utils/auth'

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({})
        .populate('username')
        .populate('email')
        .populate('github')
    },
    user: async (parent, _id) => {
      return await User.findById(_id).populate('posts')
    },
    currUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('posts')
      }
      throw new AuthenticationError('You need to be logged in.')
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {}
      return await Post.find(params).populate('comments')
    },
    post: async (parent, { _id }) => {
      return await Post.findById({ _id })
    },
    friends: async (parent, { username }) => {
      const params = username ? { username } : {}
      return await User.find(params).populate('friends')
    },
    favorites: async (parent, { _id }) => {
      return await User.find({ _id }).populate('favorites')
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
    },
    addComment: async (parent, { postId, commentText, commentAuthor }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { comments: { commentText, commentAuthor } }},
        {
          new: true,
          runValidators: true
        }
      )
    },
    updateComment: async (parent, { postId, commentId, commentText }) => {
      return await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': commentId },
        { 'comments.$.commentText': commentText },
        { new: true }
      )
    },
    removeComment: async (parent, { postId, commentId }) => {
      return await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      )
    },
    addFriend: async (parent, { userId, friendId }) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $push: { friends: friendId } },
        { new: true }
      )
    },
    removeFriend: async (parent, { userId, friendId }) => {
      const friend = await User.findOne({ _id: friendId })
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friend._id } }
      )
    },
    addFavorite: async (parent, { postId }, context) => {
      const post = await Post.findOne({ _id: postId })
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { favorites: post._id } }
      )
    },
    removeFavorite: async (parent, { userId, postId }) => {
      const favorite = await Post.findOne({ _id: postId })
      return await Post.findOneAndUpdate(
        { _id: userId },
        { $pull: { favorites: favorite._id } }
      )
    }
  }
}

export default resolvers