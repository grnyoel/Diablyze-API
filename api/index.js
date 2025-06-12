require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const predictionRoute = require('../routes/predictionRoute');
const { errorHandlerMiddleware } = require('../middlewares/errorMiddleware');

// Middleware
const allowedOrigins = [
  'https://lustrous-dusk-cfc37a.netlify.app', // Frontend Netlify
  'http://localhost:3000' // Development
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Endpoint auth: /api/auth/login
app.use('/api/predict', predictionRoute);  // Endpoint prediksi: /api/predict

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'The API is Healthy' });
});

app.get('/api/', (req, res) => {
  res.json({ status: 'Diablyze API is Running' });
});

// Error handler
app.use(errorHandlerMiddleware);

module.exports = (req, res) => app(req, res);