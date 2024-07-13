const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    calorieAmount: {
        type: Number,
        required: true
    },
    mealTime: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);