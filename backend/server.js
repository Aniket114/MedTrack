const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());
const contactRoutes =require( './routes/contact.js'); // 👈 yeh add karo

const medicineRoutes = require('./routes/medicineRoutes');
// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Routes

app.use('/api/medicine', medicineRoutes);

// ✅ Serve frontend build from here:
const frontendPath = path.join(__dirname, '../medtrack/build');
app.use(express.static(frontendPath));

// ✅ React Route Fallback:
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Connect DB & Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));