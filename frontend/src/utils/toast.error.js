import toast from "react-hot-toast";

export default function toastError(error) {
  const data = error.response?.data;
  toast.error(data?.extra || data?.message || "Something went wrong");
}
