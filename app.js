require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const predictionRoute = require('./routes/predictionRoute');
const { errorHandlerMiddleware } = require('./middlewares/errorMiddleware');
const { loadDiabetesModel, predictDiabetes } = require('./models/DiabetesModel');

// Load Model
// (async () => {
//   try {
//     await DiabetesModel.loadModel();
//     console.log('ML Model ready');
//   } catch (error) {
//     console.error('Failed to load ML model:', error);
//   }
// })();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
// app.use('/api/auth', authRoutes); for endpoint /api/auth/login etc

app.use('/api', predictionRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Get API
app.get('/', (req, res) => {
  res.send('Welcome to Diablyze API, this means its running');
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
