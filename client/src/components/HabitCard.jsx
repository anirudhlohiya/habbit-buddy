import api from "../api"

export default function HabitCard({ habit, setHabit }) {

  const checkedToday =
    habit.lastCheckedDate &&
    new Date(habit.lastCheckedDate).toDateString() ===
    new Date().toDateString()

  const checkIn = async () => {
    if (checkedToday) return
    const res = await api.post("/checkin", { userId: getUserId() })
    setHabit(res.data)
  }

  return (
    <div className="card">
      <p className="habit">{habit.habitName}</p>

      <p className="streak">
        🔥 {habit.streak} day streak
      </p>

      <button
        onClick={checkIn}
        disabled={checkedToday}
        style={{ opacity: checkedToday ? 0.6 : 1 }}
      >
        {checkedToday ? "Completed Today ✅" : "Mark Today as Done"}
      </button>

      <p className="quote">
        Small steps every day
      </p>
    </div>
  )
}
