const supabase = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User {
  static async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          email, 
          password: hashedPassword, 
          name 
        }
      ])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, created_at')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  static async isTokenBlacklisted(token) {
    const { data, error } = await supabase
      .from('token_blacklist')
      .select('token')
      .eq('token', token)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
  
  static async addToBlacklist(token) {
    const { error } = await supabase
      .from('token_blacklist')
      .insert([{ token }]);
    
    if (error) throw error;
  }
}

module.exports = User;