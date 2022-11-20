import axios from "axios"

export const api = axios.create({
  baseURL: "https://worldcupjson.net",
})

export const fetchGroups = async () => {
  const res = await api.get("/teams")
  return res.data.groups
}

export const fetchTodaysMatches = async () => {
  const res = await api.get("/matches/today")
  return res.data
}
