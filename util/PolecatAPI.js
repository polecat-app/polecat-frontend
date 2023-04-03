import axios from "axios";

const api = axios.create({
 baseURL: "https://api.polecat.app",
});

export default api;