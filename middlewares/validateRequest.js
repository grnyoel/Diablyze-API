const { body, validationResult } = require('express-validator');

const validatePrediction = [
  body('gender').isFloat({ min: 0, max: 1 }).withMessage('Gender: 0 (Female) / 1 (Male)'),
  body('age').isFloat({ min: 0, max: 120 }).withMessage('Usia harus 0-120 tahun'),
  body('hypertension').isFloat({ min: 0, max: 1 }).withMessage('Hypertension: 0 (Tidak) / 1 (Ya)'),
  body('heart_disease').isFloat({ min: 0, max: 1 }).withMessage('Penyakit jantung: 0 (Tidak) / 1 (Ya)'),
  body('smoking_history').isFloat({ min: 0, max: 4 }).withMessage(`
    Riwayat merokok: 
    0 (Tidak pernah), 
    1 (Pernah), 
    2 (Merokok sekarang), 
    3 (Berhenti), 
    4 (Tidak diketahui)
  `),
  body('bmi').isFloat({ min: 10, max: 70 }).withMessage('BMI harus antara 10-70'),
  body('HbA1c_level').isFloat({ min: 3, max: 15 }).withMessage('HbA1c harus 3-15%'),
  body('blood_glucose_level').isFloat({ min: 50, max: 300 }).withMessage('Gula darah harus 50-300 mg/dL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validatePrediction };