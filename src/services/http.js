import axios from "axios";
import { toast } from "react-toastify";

import { apiPath } from "../configs";

axios.defaults.headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: 0,
  Accept: "application/json"
};

const post = async (url = "", body = {}, headers = {}) => {
  return await axios.post(apiPath + url, body, {
    headers
  });
};

const put = async (url = "", body = {}, headers = {}) => {
  return await axios.put(apiPath + url, body, {
    headers
  });
};

const get = async (url = "", headers = {}) => {
  return await axios.get(apiPath + url, {
    headers
  });
};

const deleteRequest = async (url = "", headers = {}) => {
  return await axios.delete(apiPath + url, {
    headers
  });
};

export default {
  get,
  post,
  put,
  delete: deleteRequest
};
