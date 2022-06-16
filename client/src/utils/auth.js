import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    //return true if token is present/valid AND is not expried
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  isTokenExpired() {
    const decoded = decode(this.token);
    if (decoded.exp < Date.now / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    //reminder to have this getItem match from App.js
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    //once logged, navigate to home page
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default AuthService;
