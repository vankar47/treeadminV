import React from "react";
import { toast } from "react-toastify";
import ToastBody from "../components/Popups/ToastBody";
import storage from "../services/storage";
export const handleHttpErrors = error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error(
      <ToastBody title="Error" message="An unexpected error occurrred." />
    );
  } else if (error.response.status === 400) {
    toast.error(<ToastBody title="Error" message={error.response.data} />);
  } else if (error.response.status === 401) {
    toast.warn(<ToastBody title="Warning" message={error.response.data} />);
    storage.remove("xAuthToken");
    window.location.href = "/login";
  } else if (error.response.status === 403) {
    toast.warn(<ToastBody title="Warning" message={error.response.data} />);
  } else {
    toast.error(<ToastBody title="Error" message={"Something went wrong."} />);
  }
  return;
};
