const express = require('express');
const router = express.Router();
const Habit = require('../models/Habits');

// get habit
router.get("/", async (req, res) => {
    const habit = await Habit.findOne()
    res.json(habit)
})

// create habit
router.post("/create", async (req, res) => {
    await Habit.deleteMany()
    const habit = await Habit.create({ habitName: req.body.habitName})
    res.json(habit)
})


// Check in today
router.post('/checkin', async (req, res) => {
    const habit = await Habit.findOne()
    if(!habit) return res.status(404).json({message: "No habit found"})
    
    const today = new Date().toDateString();
    const last = habit.lastCheckedDate
    ? habit.lastCheckedDate.toDateString()
    : null

    if(today === last) {
        return res.json(habit)
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if(last === yesterday.toDateString()) {
        habit.streak += 1
    } else {
        habit.streak = 1
    }

    habit.lastCheckedDate = new Date()
    await habit.save()

    res.json(habit)
})

module.exports = router