import http from "../services/http";

const create = (form, adminAuthToken) => {
  return http.post("/users", form, { "x-auth-token": adminAuthToken });
};
const get = (_id, adminAuthToken) => {
  return http.get("/users/admin/" + _id, { "x-auth-token": adminAuthToken });
};

const edit = (form, adminAuthToken) => {
  return http.post("/users/edit", form, { "x-auth-token": adminAuthToken });
};
const makeVip = (id, adminAuthToken, couponCode, couponLimit) => {
  return http.put(
    "/users/create_affiliate_user",
    { userId: id, couponCode, couponLimit },
    { "x-auth-token": adminAuthToken }
  );
};

const removeVip = (id, adminAuthToken) => {
  return http.put(
    "/users/remove_affiliate_user",
    { userId: id, },
    { "x-auth-token": adminAuthToken }
  );
};

const setGlobalLimit = (couponLimit,adminAuthToken) => {
  return http.post("/users/set_global_coupon_limit",{couponLimit},{ "x-auth-token": adminAuthToken })
}

const getGlobalLimit = (adminAuthToken) =>  {
  return http.get("/users/global_coupon_limit",{"x-auth-token": adminAuthToken})
}

const createUserSession = (userId, adminAuthToken) => {
  return http.post(
    "/users/create_user_session/" + userId,
    {},
    {
      "x-auth-token": adminAuthToken,
    }
  );
};
export default {
  edit,
  create,
  get,
  createUserSession,
  makeVip,
  removeVip,
  setGlobalLimit,
  getGlobalLimit
};
