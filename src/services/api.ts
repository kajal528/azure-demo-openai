import axios from "axios";

const api = axios.create({
  baseURL: "https://azure-demo-openai-gwgbf3dyetd7bhge.centralindia-01.azurewebsites.net/",
});

export default api;
