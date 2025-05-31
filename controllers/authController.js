const authService = require('../services/authService');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const authController = {
  register: async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const result = await authService.getProfile(req.user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];

      // Save token to blacklist
      const { error } = await supabase
        .from('token_blacklist')
        .insert([{ token }]);
      
      if (error) throw error;

      res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;