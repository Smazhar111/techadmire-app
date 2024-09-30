export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('token'));
    console.log(user)
    if (user) {
        return { Authorization: 'Bearer ' + user }; // for Spring Boot back-end
      //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }