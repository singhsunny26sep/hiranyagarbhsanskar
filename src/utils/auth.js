export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => Boolean(getToken());

export const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
