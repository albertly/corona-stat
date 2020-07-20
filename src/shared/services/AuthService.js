import { UserManager } from 'oidc-client';

class AuthService {
  constructor() {
    const settings = {
      authority: process.env.REACT_APP_STS_AUTHORITY,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: `${process.env.REACT_APP_CLIENT_ROOT}:/${process.env.PORT}/signin-callback.html`,
      silent_redirect_uri: `${process.env.REACT_APP_CLIENT_ROOT}:/${process.env.PORT}/silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${process.env.REACT_APP_CLIENT_ROOT}:/${process.env.PORT}/`,
      response_type: 'code',
      scope: `${process.env.REACT_APP_CLIENT_SCOPE}`,
    };
    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser();
  }

  login() {
    return this.userManager.signinRedirect();
  }

  renewToken() {
    return this.userManager.signinSilent();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}

export default AuthService;
