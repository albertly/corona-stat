import axios from 'axios';
import AuthService from './AuthService';

class ApiService {
  constructor() {
    this.authService = new AuthService();
  }

  callApi(sub) {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callApi(sub, user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._callApi(sub, renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._callApi(sub, renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _callApi(sub, token) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    console.log('Bearer ' + token);
    //return axios.get('/testAuth', { headers });
    return axios.post('/subscribe', JSON.parse(sub), { headers });
  }
}

export default ApiService;
