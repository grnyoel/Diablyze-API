require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { errorHandlerMiddleware } = require('./middlewares/errorMiddleware');
const DiabetesModel = require('./ml-models/DiabetesModel');

// Load Model
// (async () => {
//   try {
//     await DiabetesModel.loadModel();
//     console.log('✅ ML Model ready');
//   } catch (error) {
//     console.error('❌ Failed to load ML model:', error);
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
