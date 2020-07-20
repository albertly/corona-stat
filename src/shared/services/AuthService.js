import { UserManager } from 'oidc-client';

class AuthService {
  constructor() {
    const settings = {
      authority: process.env.REACT_APP_STS_AUTHORITY,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: `${window.location.href}signin-callback.html`,
      silent_redirect_uri: `${window.location.href}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${window.location.href}`,
      response_type: 'code',
      scope: `${process.env.REACT_APP_CLIENT_SCOPE}`,
    };
    console.log('setting', settings);
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
