const User = require('../models/userModel')
const { NotFoundError } = require('../middlewares/errorMiddleware');
const { BadRequestError, UnauthenticatedError } = require('../middlewares/errorMiddleware');

class AuthService {
  async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await User.create(userData);
    const token = User.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
    
  }

  async login(credentials) {
    const user = await User.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordCorrect = await User.verifyPassword(user, credentials.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials');
    }

    const token = User.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at
      }
    };
  }
}

module.exports = new AuthService();