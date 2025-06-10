const { body } = require('express-validator');

const validatePrediction = [
  body('gender').isFloat({ min: 0, max: 1 }).withMessage('Gender must be 0 or 1'),
  body('age').isFloat({ min: 0, max: 120 }).withMessage('Age must be between 0-120'),
  body('hypertension').isFloat({ min: 0, max: 1 }).withMessage('Hypertension must be 0 or 1'),
  body('heart_disease').isFloat({ min: 0, max: 1 }).withMessage('Heart disease must be 0 or 1'),
  body('smoking_history').isFloat({ min: 0, max: 4 }).withMessage('Invalid smoking history value'),
  body('bmi').isFloat({ min: 10, max: 70 }).withMessage('BMI must be between 10-70'),
  body('HbA1c_level').isFloat({ min: 3, max: 15 }).withMessage('HbA1c must be between 3-15'),
  body('blood_glucose_level').isFloat({ min: 50, max: 300 }).withMessage('Blood glucose must be between 50-300')
];

module.exports = { validatePrediction };