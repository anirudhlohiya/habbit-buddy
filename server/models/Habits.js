const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    habitName: String,
    streak: {
        type: Number,
        default: 0
    },
    lastCheckedDate: Date
}, { timestamps: true })

module.exports = mongoose.model('Habit', habitSchema);