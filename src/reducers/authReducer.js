import storage from "../services/storage";
const auth = {
  adminAuthToken: storage.get("adminAuthToken"),
  adminUser: storage.get("adminUser") || {}
};

const authReducer = (state = auth, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        adminAuthToken: action.adminAuthToken,
        adminUser: action.adminUser
      };

    case "LOGOUT_USER":
      return {
        adminAuthToken: "",
        adminUser: {}
      };

    case "UPDATE_AUTH_TOKEN":
      return {
        adminAuthToken: action.adminAuthToken,
        adminUser: state.adminUser
      };

    case "UPDATE_USER":
      return {
        adminAuthToken: state.adminAuthToken,
        adminUser: action.adminUser
      };

    default:
      return state;
  }
};

export default authReducer;
