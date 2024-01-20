const apiPath = '/api/v1';

export default {
  login: () => [apiPath, 'login'].join('/'),
  signup: () => [apiPath, 'signup'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  mainPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};
