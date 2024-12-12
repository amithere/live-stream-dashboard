import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Replace with your backend URL

export const fetchLiveData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recent-changes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching live data:", error);
    throw error;
  }
};