import axios from "axios";
import { config } from "../config";
import authHeader from "./auth-header";
const API_URL = config.API_URL+'auth/';
export default {
  login(user) {
    return axios
      .post(
        API_URL + "signin",
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  },
  logout() {
    localStorage.removeItem("user");
  },
  register(user) {
    return axios.post(
      API_URL + "signup",
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      {
        headers: authHeader(),
      }
    );
  },
  verifyUser(code) {
    return axios.get(API_URL + "confirm/" + code, {
      headers: authHeader(),
    });
  },
  sendResetEmail(url, value) {
    return axios.post(API_URL + url, value, {
      headers: authHeader(),
    });
  },
  passwordReset(url, value) {
    return axios.post(API_URL + url, value, {
      headers: authHeader(),
    });
  },
};
