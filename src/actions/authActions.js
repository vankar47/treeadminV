export const loginUser = ({ adminAuthToken, adminUser }) => {
  return {
    type: "LOGIN_USER",
    adminAuthToken,
    adminUser
  };
};

export const logoutUser = () => {
  return { type: "LOGOUT_USER" };
};
