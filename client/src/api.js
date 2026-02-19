import axios from 'axios';

export default axios.create({
  baseURL: "https://habbit-buddy.onrender.com/api/habit"
})