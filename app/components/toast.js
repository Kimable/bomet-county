import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show attendance status as a toast
export const showToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
