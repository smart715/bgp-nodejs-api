import axios from "axios";
import { config } from "../config";
import authHeader from "./auth-header";
const API_URL = config.API_URL;
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all", { headers: authHeader() });
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getUserProfile(url) {
    return axios.get(API_URL + url, { headers: authHeader() });
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
  updateProfile(url, user) {
    return axios.put(API_URL + url, user, { headers: authHeader() });
  }
  removeUser(url) {
    return axios.delete(API_URL + "admin" + url, {
      headers: authHeader(),
    });
  }
  changeStatus(url, user) {
    return axios.put(API_URL + "admin" + url, user, { headers: authHeader() });
  }
}
export default new UserService();
