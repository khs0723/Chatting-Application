export const logout = () => {
  localStorage.clear();
  window.location.path = "/login";
};
