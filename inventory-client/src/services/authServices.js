const AUTH_TOKEN_KEY = 'inv-auth-token';

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

const setAuthToken = (token) => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const hasToken = () => Boolean(getAuthToken());

export const AuthServices = {
  getAuthToken,
  setAuthToken,
  hasToken,
};
