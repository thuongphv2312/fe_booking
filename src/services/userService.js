import axios from "../axios";
const handleLogin = (email, password) => {
  return axios.post("/api/v1/login", {
    email: email,
    password: password,
  });
};

export { handleLogin };
