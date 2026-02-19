export const getUserId = () => {
    let userId = localStorage.getItem("habit_user_id")
    if(!userId) {
        userId = crypto.randomUUID()
        localStorage.setItem("habit_user_id", userId)
    }
    return userId
}