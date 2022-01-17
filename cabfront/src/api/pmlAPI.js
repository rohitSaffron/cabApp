import axios from "axios";

export default axios.create({
  //baseURL: "https://cab-app-api-backend.herokuapp.com",
  baseURL: "http://localhost:5000",
});
