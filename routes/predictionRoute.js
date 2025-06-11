const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { predictDiabetes } = require('../controllers/predictionController');
const { validatePrediction } = require('../middlewares/validateRequest');

router.post('/predict',
  authMiddleware,
  validatePrediction,
  predictDiabetes
);

module.exports = router;