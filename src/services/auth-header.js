export default function authHeader() {
  const userJson = JSON.parse(localStorage.getItem('user'));

  let user = userJson ? userJson : null;
  
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
    // otherwise => return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
