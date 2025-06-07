const Medicine = require('../models/Medicine');

exports.addMedicine = async (req, res) => {
  try {
    const { name, dosage, time, days } = req.body;

    if (!name || !req.user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const medicine = await Medicine.create({
      user: req.user,
      name,
      dosage,
      time,
      days
    });

    res.status(201).json({ message: 'Medicine added', medicine });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json({ medicines: meds });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch medicines', error: err.message });
  }
};
exports.deleteMedicine = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: "Medicine not found" });

    if (med.user.toString() !== req.user)
      return res.status(403).json({ message: "Unauthorized" });

    await med.deleteOne();
    res.status(200).json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting medicine", error: err.message });
  }
};
