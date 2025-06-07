// routes/contact.js;
const express=require('express')
const Contact=require ('../models/Contact.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMsg = new Contact({ name, email, message });
    await newMsg.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
});

module.exports = router;
