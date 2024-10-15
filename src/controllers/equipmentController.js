const Equipment = require('../models/equipment');

// Get all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find().populate('addedBy', 'username');
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving equipment', error });
  }
};

// Add new equipment
const addEquipment = async (req, res) => {
  const { name, description, price, addedBy } = req.body;
  try {
    const newEquipment = new Equipment({
      name,
      description,
      price,
      addedBy
    });
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding equipment', error });
  }
};

// Update equipment by ID
const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating equipment', error });
  }
};

// Delete equipment by ID
const deleteEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(id);
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment', error });
  }
};

module.exports = {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment
};
