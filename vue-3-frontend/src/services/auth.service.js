import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8080/api/auth/';
export default {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      }, {
        headers: authHeader()
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  },
  logout() {
    localStorage.removeItem('user');
  },
  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, {
      headers: authHeader()
    });
  }
}