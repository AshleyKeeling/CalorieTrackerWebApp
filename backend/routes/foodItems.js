const express = require('express');
const { getAllFoodItems, getFoodItem, createFoodItem, deleteFoodItem } = require('../controllers/foodItemController');

const router = express.Router();

// GET all food items
router.get('/', getAllFoodItems);

// GET a single food item
router.get('/:id', getFoodItem);

// POST a new food item
router.post('/', createFoodItem);

// DELETE a food item
router.delete('/:id', deleteFoodItem);

module.exports = router;