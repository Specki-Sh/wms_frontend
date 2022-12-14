import axios from "axios";

const baseURL = "http://localhost:5000/api/";
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    dataType: "json",
    "Content-Type": "application/json",
  },
});

export default instance;
