const FoodItem = require('../models/FoodItemModel');
const mongoose = require('mongoose');

// GET all food items
const getAllFoodItems = async (req, res) => {
    const user_id = req.user._id;
    try {
        const foodItems = await FoodItem.find({ user_id }).sort({ createdAt: -1 });
        //sends food items back as json
        res.status(200).json(foodItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

// GET single food item
const getFoodItem = async (req, res) => {
    const { id } = req.params;

    // checks if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such food item (invalid ID)' });
    }

    // gets food item
    try {
        const foodItem = await FoodItem.findById(id);
        if (foodItem) {
            res.status(200).json(foodItem);
        } else {
            res.status(400).json({ error: "food item not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

// POST a new food item
const createFoodItem = async (req, res) => {
    const { name, calorieAmount, mealTime } = req.body;

    // error checking
    const emptyFields = []

    if (!name) {
        emptyFields.push('name');
    }
    if (!calorieAmount) {
        emptyFields.push('calorieAmount');
    }
    if (!mealTime) {
        emptyFields.push('mealTime');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id;
        const foodItem = await FoodItem.create({ name, calorieAmount, mealTime, user_id });
        res.status(200).json(foodItem);
    } catch (error) {
        res.status(400).json({ error: error.message, emptyFields });
        console.log(error);
    }
};

// DELETE a food item
const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    // checks if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such food item (invalid ID)' });
    }

    // deletes food item
    try {
        const foodItem = await FoodItem.findByIdAndDelete({ _id: id });

        if (foodItem) {
            res.status(200).json(foodItem);
        } else {
            res.status(400).json({ error: 'No such Food Item' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

// update food item
const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const { name, calorieAmount, mealTime } = req.body;

    // checks if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such food item (invalid ID)' });
    }

    // error checking
    const emptyFields = []

    if (!name) {
        emptyFields.push('name');
    }
    if (!calorieAmount) {
        emptyFields.push('calorieAmount');
    }
    if (!mealTime) {
        emptyFields.push('mealTime');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // updates food item
    try {
        const foodItem = await FoodItem.findByIdAndUpdate({ _id: id }, { name, calorieAmount, mealTime });

        if (foodItem) {
            res.status(200).json(foodItem);
        } else {
            res.status(400).json({ error: 'No such Food Item' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = {
    getAllFoodItems,
    getFoodItem,
    createFoodItem,
    deleteFoodItem,
    updateFoodItem
}