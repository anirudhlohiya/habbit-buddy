const express = require('express')
const router = express.Router()
const Habit = require('../models/Habits')

// Get habit (per user)
router.get('/', async (req, res) => {
  const { userId } = req.query
  const habit = await Habit.findOne({ userId })
  res.json(habit)
})

// Create habit (per user)
router.post('/create', async (req, res) => {
  const { habitName, userId } = req.body

  await Habit.deleteMany({ userId })

  const habit = await Habit.create({
    habitName,
    userId
  })

  res.json(habit)
})

// Check-in (per user)
router.post('/checkin', async (req, res) => {
  const { userId } = req.body

  const habit = await Habit.findOne({ userId })
  if (!habit) {
    return res.status(404).json({ message: 'No habit found' })
  }

  const today = new Date().toDateString()
  const last = habit.lastCheckedDate
    ? habit.lastCheckedDate.toDateString()
    : null

  if (today === last) {
    return res.json(habit)
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  habit.streak =
    last === yesterday.toDateString()
      ? habit.streak + 1
      : 1

  habit.lastCheckedDate = new Date()
  await habit.save()

  res.json(habit)
})

module.exports = router