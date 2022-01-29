import axios from "axios";

export default axios.create({
  //baseURL: 'https://pml-cab-rest-api.herokuapp.com/',
  baseURL: "http://localhost:5000",
});
