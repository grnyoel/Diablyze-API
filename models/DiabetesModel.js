const tf = require('@tensorflow/tfjs-node');
const path = require('path');

let diabetesModel;

async function loadDiabetesModel() {
  try {
      const modelPath = path.join(__dirname, '..', 'tfja_model', 'diabetes-model', 'model.json'); // Adjust path accordingly
      diabetesModel = await tf.loadLayersModel(`file://${modelPath}`);
      console.log('Diabetes Model loaded successfully for server-side inference');
      return diabetesModel;
  } catch (error) {
      console.error('Error loading Diabetes model:', error);
      throw error;
  }
}

async function predictDiabetes(inputDataProcessed) {
  if (!diabetesModel) {
      throw new Error('Diabetes model not loaded.');
  }

  try {
    const inputTensor = tf.tensor2d([inputDataProcessed], [1, inputDataProcessed.length]);
    const prediction = diabetesModel.predict(inputTensor);
    const predictionArray = await prediction.data();
    return predictionArray;

    } catch (error) {
        console.error('Error during Diabetes prediction:', error);
        throw error;
  } finally {
    
    }
}

    module.exports = {
        loadDiabetesModel,
        predictDiabetes
    };