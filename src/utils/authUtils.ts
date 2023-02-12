export const setTokenInLocalStorage = (token: string) => {
  const tokenStringify = JSON.stringify(token);
  localStorage.setItem("@matera-dashboard:user-token", tokenStringify);
};

export const getTokenParsedInLocalStorage = () => {
  const token = localStorage.getItem("@matera-dashboard:user-token");
  if (token) {
    const tokenParsed = JSON.parse(token);
    return tokenParsed;
  }
};

export const removeTokenInLocalStorage = () => {
  localStorage.removeItem("@matera-dashboard:user-token");
};
