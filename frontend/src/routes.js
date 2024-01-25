const apiPath = '/api/v1';

export default {
  login: () => [apiPath, 'login'].join('/'),
  signup: () => [apiPath, 'signup'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  channel: (id) => [apiPath, 'channels', id].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  message: (id) => [apiPath, 'messages', id].join('/'),
  mainPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};
