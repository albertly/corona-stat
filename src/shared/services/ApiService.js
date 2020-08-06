import axios from 'axios';

class ApiService {
  constructor(auth) {
    this.authService = auth;
  }

  callGetSubscriber(subscription) {
    const user = this.authService.userData;
    if (user) {
      subscription.uid = user.sub;
      return axios.post('/subscriber', subscription);
    }
    return Promise.reject('Not logged');
  }

  callApi(sub) {
    const user = this.authService.userData;

    if (user && user.access_token) {
      return this._callApi(sub, user.access_token).catch(error => {
        if (error.response.status === 401) {
          this.authService.signIn();
          const renewedUser = this.authService.userData;
          return this._callApi(sub, renewedUser.access_token);
        }
        throw error;
      });
    } else if (user) {
      this.authService.signIn();
      const renewedUser = this.authService.userData;

      return this._callApi(sub, renewedUser.access_token);
    } else {
      throw new Error('user is not logged in');
    }
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
