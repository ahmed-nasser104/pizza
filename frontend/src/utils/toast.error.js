import toast from "react-hot-toast";

export const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error) {
    return data.error;
  }

  if (typeof data === "string" && data) {
    return data;
  }

  if (typeof error?.message === "string" && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export default function toastError(error) {
  toast.error(getErrorMessage(error));
}
