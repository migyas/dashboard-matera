export const setTokenInLocalStorage = (token: string) => {
  const tokenStringify = JSON.stringify(token);
  localStorage.setItem("@matera-dashboard:user-token", tokenStringify);
};

export const setUserInLocalStorage = (user: string) => {
  const tokenStringify = JSON.stringify(user);
  localStorage.setItem("@matera-dashboard:user", tokenStringify);
};

export const getTokenParsedInLocalStorage = () => {
  const token = localStorage.getItem("@matera-dashboard:user-token");
  if (token) {
    const tokenParsed = JSON.parse(token);
    return tokenParsed;
  }
};

export const getUserParsedInLocalStorage = () => {
  const user = localStorage.getItem("@matera-dashboard:user");
  if (user) {
    const tokenParsed = JSON.parse(user);
    return tokenParsed;
  }
};

export const removeTokenInLocalStorage = () => {
  localStorage.removeItem("@matera-dashboard:user-token");
  localStorage.removeItem("@matera-dashboard:user");
};
