import axios from "axios";
import { config } from "../config";
import authHeader from "./auth-header";
const API_URL = config.API_URL;
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
  updateFlowSpecRules(url, rule) {
    return axios.put(API_URL + url, rule, {
      headers: authHeader(),
    });
  }
  getFlowSpecRuleById(url) {
    return axios.get(API_URL + url, {
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
