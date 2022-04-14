import User from '../db/models/user'
import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import validateToken from '../utils/verify-autentication'

export const resolvers = {
    Query: {
      users: async (_: any, data: any, context: any) => {
        validateToken(context.token)

        try {
          const users = await User.find({}).sort({'_id': -1})
  
          return users
        } catch (err) {
          throw err
        }
      },
    },
    Mutation: {
      newUser: async (_: any, data: any) => {
        try {
          const input = data.input
          const result = await User.create(input)
  
          return result
        } catch (err: any) {
          const CODE_MESSAGE_UNIQUE = 11000

          if (err.code === CODE_MESSAGE_UNIQUE) {
            throw new Error('Email must be unique')
          }

          throw err
        }
      },
      login: async (_: any, data: any) => { 
        try {
          const user = await User.findOne({ email: data.email, isAdmin: true })

          if (!user) {
            throw new Error('No user with that email')
          }

          const isValidPassword = await bcryptjs.compare(data.password, user.password);

          if (!isValidPassword) {
            throw new Error('Incorrect password')
          }

          const token = jsonwebtoken.sign({ ...user._doc }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

          return { token, user }
        } catch (err: any) {
          throw err
        }
      }
    }
  }