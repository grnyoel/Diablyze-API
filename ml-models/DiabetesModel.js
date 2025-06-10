const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');

class DiabetesModel {
  constructor() {
    this.model = null;
    this.scalingParams = {
      mean: [0.5, 45, 0.1, 0.05, 1.5, 25, 5.5, 125],
      std: [0.5, 15, 0.3, 0.22, 1.5, 5, 1.5, 50]
    };
  }

  async loadModel() {
    if (!this.model) {
      try {
        const modelPath = path.join(__dirname, 'diabetes-model', 'model.json');
        
        // Validasi file model
        if (!fs.existsSync(modelPath)) {
          throw new Error(`Model file not found at ${modelPath}`);
        }

        console.log(`Loading model from: ${modelPath}`);
        this.model = await tf.loadLayersModel(`file://${modelPath.replace(/\\/g, '/')}`);
        
        // Warmup model
        await this.warmup();
        console.log('Model loaded and warmed up');
      } catch (error) {
        console.error('Model loading failed:', error);
        throw new Error('Failed to initialize ML model');
      }
    }
    return this.model;
  }

  async warmup() {
    const dummyInput = this.preprocessInput({
      gender: 0.5,
      age: 45,
      hypertension: 0,
      heart_disease: 0,
      smoking_history: 1,
      bmi: 25,
      HbA1c_level: 5.5,
      blood_glucose_level: 125
    });
    
    const tensor = tf.tensor2d([dummyInput]);
    const prediction = await this.model.predict(tensor).data();
    tensor.dispose();
    console.log(`Warmup prediction: ${prediction[0]}`);
  }

  preprocessInput(input) {
    return [
      (input.gender - this.scalingParams.mean[0]) / this.scalingParams.std[0],
      (input.age - this.scalingParams.mean[1]) / this.scalingParams.std[1],
      (input.hypertension - this.scalingParams.mean[2]) / this.scalingParams.std[2],
      (input.heart_disease - this.scalingParams.mean[3]) / this.scalingParams.std[3],
      (input.smoking_history - this.scalingParams.mean[4]) / this.scalingParams.std[4],
      (input.bmi - this.scalingParams.mean[5]) / this.scalingParams.std[5],
      (input.HbA1c_level - this.scalingParams.mean[6]) / this.scalingParams.std[6],
      (input.blood_glucose_level - this.scalingParams.mean[7]) / this.scalingParams.std[7]
    ];
  }

  async predict(inputData) {
    try {
      const model = await this.loadModel();
      const processedInput = this.preprocessInput(inputData);
      
      const tensorInput = tf.tensor2d([processedInput]);
      const predictionTensor = model.predict(tensorInput);
      const probability = (await predictionTensor.data())[0];
      
      // Cleanup
      tensorInput.dispose();
      predictionTensor.dispose();
      
      return {
        prediction: probability >= 0.5 ? 1 : 0,
        probability: probability,
        status: 'success'
      };
    } catch (error) {
      console.error('Prediction error:', error);
      return {
        status: 'error',
        message: error.message
      };
    }
  }
}

module.exports = new DiabetesModel();