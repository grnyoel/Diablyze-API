require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const predictionRoute = require('../routes/predictionRoute');
const { createClient } = require('@supabase/supabase-js');
const { errorHandlerMiddleware } = require('../middlewares/errorMiddleware');

// Supabase config
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
// app.use(cors({
//   origin: 'https://lustrous-dusk-cfc37a.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

// }));
// app.options('*', cors()); // Preflight

app.use(cors()); // izinkan semua origin dan method

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Endpoint auth: /api/auth/login
app.use('/api', predictionRoute);  // Endpoint prediksi: /api/predict

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'The API is Healthy' });
});

app.get('/api/', (req, res) => {
  res.json({ status: 'Diablyze API is Running' });
});

// Error handler
app.use(errorHandlerMiddleware);

module.exports = app;