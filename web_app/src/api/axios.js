import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:4000"
  //baseURL: "https://029a-2800-e2-c680-29d0-50ff-cec-760a-83a.ngrok.io"
});
