const predictDiabetes = async (req, res) => {
  try {
    const {
      gender,
      age,
      hypertension,
      heart_disease,
      smoking_history,
      bmi,
      HbA1c_level,
      blood_glucose_level
    } = req.body;

    // Validasi input
    if ([gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]
      .some(val => val === undefined || val === null)) {
      return res.status(400).json({ error: "Semua field harus diisi" });
    }

    // Rule-based prediction
    let score = 0;

    // 1. Age factor
    if (age > 45) score += 0.2;
    else if (age > 30) score += 0.1;

    // 2. BMI factor
    if (bmi >= 30) score += 0.3;  // Obese
    else if (bmi >= 25) score += 0.15; // Overweight

    // 3. HbA1c level (glycated hemoglobin)
    if (HbA1c_level >= 6.5) score += 0.4; // Diabetes threshold
    else if (HbA1c_level >= 5.7) score += 0.2; // Prediabetes

    // 4. Blood glucose level
    if (blood_glucose_level >= 126) score += 0.4; // Fasting diabetes threshold
    else if (blood_glucose_level >= 100) score += 0.15;

    // 5. Medical history
    if (hypertension) score += 0.1;
    if (heart_disease) score += 0.1;

    // 6. Lifestyle
    if (smoking_history >= 2) score += 0.1; // Current/former smoker

    // Normalisasi skor ke probabilitas 0-1
    const probability = Math.min(Math.max(score, 0), 0.95); // Batas maksimal 95%
    const prediction = probability >= 0.5 ? 1 : 0;

    res.json({
      prediction,
      probability: parseFloat(probability.toFixed(2)),
      diagnostic: getDiagnosticMessage(prediction, probability),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function
function getDiagnosticMessage(prediction, probability) {
  if (prediction === 1) {
    if (probability >= 0.7) return "Risiko diabetes tinggi - Disarankan konsultasi dokter segera";
    return "Risiko diabetes sedang - Perubahan gaya hidup disarankan";
  } else {
    if (probability <= 0.3) return "Risiko diabetes rendah - Pertahankan gaya hidup sehat";
    return "Risiko diabetes sedikit meningkat - Monitor kesehatan rutin";
  }
}

module.exports = { predictDiabetes };