import http from "../services/http";

const login = credentials => {
  return http.post("/users/login", credentials);
};

const signup = demographics => {
  return http.post("/users/signup", demographics);
};

const resendVerificationEmail = xAuthToken => {
  return http.get("/users/resend_email", { "x-auth-token": xAuthToken });
};

const forgotPass = email => {
  return http.post("/users/forgot_password", { email });
};

const resetPass = data => {
  return http.post("/users/reset_password", data);
};

export default {
  login,
  signup,
  resendVerificationEmail,
  forgotPass,
  resetPass
};
