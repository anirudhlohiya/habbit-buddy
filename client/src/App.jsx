import { useEffect, useState } from "react"
import api from "./api"
import HabitForm from "./components/HabitForm"
import HabitCard from "./components/HabitCard"
import "./App.css"
import { getUserId } from "./utils/userId"

const userId = getUserId()

function App() {
  const [habit, setHabit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/", { params: { userId } })
      .then(res => setHabit(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="center">Loading...</p>

  return (
    <div className="app">
      <h1>Habit Buddy</h1>
        <p style={{ color: "#555", marginBottom: "20px" }}>
        Build consistency, one habit at a time.
        </p>


      {!habit
        ? <HabitForm setHabit={setHabit} />
        : <HabitCard habit={habit} setHabit={setHabit} />
      }
    </div>
  )
}

export default App