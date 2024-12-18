const TOKEN_KEY = "jwt";

export const setToken = (token) =>
  localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};