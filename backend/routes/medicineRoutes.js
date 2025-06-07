const express = require('express');
const router = express.Router();
const { addMedicine } = require('../controllers/medicineController');
const authMiddleware = require('../middleware/authMiddleware');
const { getMedicines } = require('../controllers/medicineController');
const { deleteMedicine } = require('../controllers/medicineController');

router.post('/add', authMiddleware, addMedicine);
router.get('/all', authMiddleware, getMedicines);
router.delete('/:id', authMiddleware, deleteMedicine);


module.exports = router;
