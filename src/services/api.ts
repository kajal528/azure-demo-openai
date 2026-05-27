import axios from "axios";
console.log('""""""""""""""""""""""""""""""""""""""""""""""""');
console.log(import.meta.env.VITE_API_URL);
console.log('""""""""""""""""""""""""""""""""""""""""""""""""');

const api = axios.create({
  baseURL: "https://azure-demo-openai-gwgbf3dyetd7bhge.centralindia-01.azurewebsites.net/",
});

export default api;
