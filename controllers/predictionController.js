const PredictionService = require('../services/predictionService');
const { validationResult } = require('express-validator');

const predictDiabetes = async (req, res) => {
  // Validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const inputData = {
      gender: parseFloat(req.body.gender),
      age: parseFloat(req.body.age),
      hypertension: parseFloat(req.body.hypertension),
      heart_disease: parseFloat(req.body.heart_disease),
      smoking_history: parseFloat(req.body.smoking_history),
      bmi: parseFloat(req.body.bmi),
      HbA1c_level: parseFloat(req.body.HbA1c_level),
      blood_glucose_level: parseFloat(req.body.blood_glucose_level)
    };

    const result = await PredictionService.processPrediction(req.user.id, inputData);
    res.json(result);
  } catch (error) {
    console.error('Prediction failed:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
};

module.exports = { predictDiabetes };