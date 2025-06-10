require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/authRoute"); // pastikan path ini BENAR

// Pakai routes
app.use("/", authRoutes); // bisa diganti '/api' kalau mau prefix

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
