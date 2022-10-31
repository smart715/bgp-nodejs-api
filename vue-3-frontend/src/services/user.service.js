import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }
  getAdminBoard(url, pageInform) {
    return axios.get(API_URL + "admin" + url, {
      headers: authHeader(),
      params: {
        currentPage: pageInform.currentPage,
        perPage: pageInform.perPage,
        text: pageInform.text,
      },
    });
  }
  getUserById(url) {
    return axios.get(API_URL + "admin" + url, { headers: authHeader() });
  }
  updateUser(url, user) {
    return axios.put(API_URL + "admin" + url, user, { headers: authHeader() });
  }
  removeUser(url) {
    return axios.delete(API_URL + "admin" + url, {
      headers: authHeader(),
    });
  }
  changeStatus(url, user) {
    return axios.post(API_URL + "admin" + url, user, { headers: authHeader() });
  }
}
export default new UserService();
