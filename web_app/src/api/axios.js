import axios from "axios";

const baseURL = "https://vj0bqk5t-4000.use2.devtunnels.ms";

export default axios.create({
  baseURL: baseURL,
});