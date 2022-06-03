import http from "../services/http";

const create = (form, adminAuthToken) => {
  return http.post("/categories", form, { "x-auth-token": adminAuthToken });
};
const get = (_id, adminAuthToken) => {
  return http.get("/categories/" + _id, { "x-auth-token": adminAuthToken });
};

const edit = (_id, form, adminAuthToken) => {
  return http.put("/categories/" + _id, form, {
    "x-auth-token": adminAuthToken,
  });
};

const del = (_id, adminAuthToken) => {
  return http.delete("/categories/" + _id, { "x-auth-token": adminAuthToken });
};
export default {
  edit,
  create,
  get,
  delete: del,
};
