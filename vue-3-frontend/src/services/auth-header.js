export default function authHeader() {
  const api_key = "base64:test";
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken ,'x-api-key': api_key };
    } else {
      return { 'x-api-key': api_key };
    }
  }