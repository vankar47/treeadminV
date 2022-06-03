import http from "../../services/http";

const get = (platform = "web", adminAuthToken = "") => {
  return http.get("/cms/login_screen?platform=" + platform, {
    "x-auth-token": adminAuthToken,
  });
};

const edit = (form, adminAuthToken) => {
  return http.put("/cms/login_screen/update", form, {
    "x-auth-token": adminAuthToken,
  });
};

export default {
  edit,
  get,
};
