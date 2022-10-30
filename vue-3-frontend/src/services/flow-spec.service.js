import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";

class FlowSpecService {
  getFlowSpecRules(url, pageInform) {
    return axios.get(API_URL + url, {
      headers: authHeader(),
      params: {
        currentPage: pageInform.currentPage,
        perPage: pageInform.perPage,
        text: pageInform.text,
      },
    });
  }
  createFlowSpecRules(url, rule) {
    return axios.post(API_URL + url, rule, {
      headers: authHeader(),
    });
  }
  removeFlowSpecRule(url) {
    return axios.delete(API_URL + url, {
      headers: authHeader(),
    });
  }
}
export default new FlowSpecService();
