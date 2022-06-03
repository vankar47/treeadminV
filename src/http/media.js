import http from "../services/http";

const uploadImage = (data, onUploadProgress) => {
  return http.post("/media/image", data, {}, {}, { onUploadProgress });
};

const uploadVideo = (data, onUploadProgress) => {
  return http.post("/media/video", data, {}, {}, { onUploadProgress });
};

export default { uploadImage, uploadVideo };
