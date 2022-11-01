import { config } from "../config";
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": user.accessToken, "x-api-key": config.APP_KEY };
  } else {
    return {
      "x-api-key": config.APP_KEY,
    };
  }
}
