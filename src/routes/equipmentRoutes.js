const express = require('express');
const router = express.Router();
const { getAllEquipment, addEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');

// Route to get all equipment
router.get('/equipment', getAllEquipment);

// Route to add new equipment
router.post('/equipment', addEquipment);

// Route to update equipment by ID
router.put('/equipment/:id', updateEquipment);

// Route to delete equipment by ID
router.delete('/equipment/:id', deleteEquipment);

module.exports = router;
