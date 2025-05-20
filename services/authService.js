const User = require('../models/userModel')

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
}

module.exports = new AuthService();