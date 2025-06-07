const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: String, required: true },
  days: { type: [String], required: true }, // ✅ FIXED
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Medicine", medicineSchema);
