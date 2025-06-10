const DiabetesModel = require('../ml-models/DiabetesModel');
const supabase = require('../config/supabaseClient');

class PredictionService {
  static async processPrediction(userId, inputData) {
    // Validasi input
    const validation = this.validateInput(inputData);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    // Lakukan prediksi
    const prediction = await DiabetesModel.predict(inputData);
    if (prediction.status === 'error') {
      throw new Error(prediction.message);
    }

    // Simpan ke database (opsional)
    await this.savePredictionHistory(userId, inputData, prediction);

    return {
      ...inputData,
      ...prediction,
      timestamp: new Date().toISOString()
    };
  }

  static validateInput(input) {
    const features = [
      'gender', 'age', 'hypertension', 'heart_disease',
      'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level'
    ];
    
    // Cek semua field ada
    for (const feature of features) {
      if (input[feature] === undefined || input[feature] === null) {
        return { valid: false, message: `Missing required field: ${feature}` };
      }
    }
    
    return { valid: true };
  }

  static async savePredictionHistory(userId, input, result) {
    const { data, error } = await supabase
      .from('predictions')
      .insert({
        user_id: userId,
        input_data: input,
        prediction_result: result,
        prediction_time: new Date().toISOString()
      });

    if (error) {
      console.error('Failed to save prediction:', error);
      throw error;
    }

    return data;
  }
}

module.exports = PredictionService;