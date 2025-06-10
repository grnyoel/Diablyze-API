const express = require('express');
const router = express.Router();
const { predictDiabetes } = require('../controllers/predictionController');
const { requireAuth } = require('../middlewares/authMiddleware');
const { validatePrediction } = require('../middlewares/validateRequest');

router.post('/predict', 
  requireAuth,
  validatePrediction,
  predictDiabetes
);

module.exports = router;