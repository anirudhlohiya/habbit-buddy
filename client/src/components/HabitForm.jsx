import { useState } from "react"
import api from "../api"

export default function HabitForm({ setHabit }) {
  const [name, setName] = useState("")

  const submit = async () => {
    if (!name.trim()) return
    const res = await api.post("/create", { habitName: name })
    setHabit(res.data)
  }

  return (
    <div className="card">
      <p className="title">What habit do you want to build?</p>

      <input
        placeholder="e.g. Drink Water"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={submit}>Start Habit</button>
    </div>
  )
}