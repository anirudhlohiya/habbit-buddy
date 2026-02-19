export const getUserId = () => {
  let userId = localStorage.getItem("habit_user_id")
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15)
    localStorage.setItem("habit_user_id", userId)
  }
  return userId
}