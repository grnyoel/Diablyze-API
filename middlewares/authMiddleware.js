const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError } = require('./errorMiddleware');
require('dotenv').config();

// Inisialisasi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  // Function to check blacklist token
  const isTokenBlacklisted = async (token) => {
    const { data, error } = await supabase
      .from('token_blacklist')
      .select('token')
      .eq('token', token)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  };

  // Check blacklist
  const isBlacklisted = await isTokenBlacklisted(token);
  if (isBlacklisted) {
    throw new UnauthenticatedError('Token is no longer valid');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

module.exports = authMiddleware;