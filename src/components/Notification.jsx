import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const notify = (message) => toast(message);

export default function Notification() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      toastStyle={{
        backgroundColor: "#8247E5",
        color: "white",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "8px",
        padding: "8px 16px",
      }}
      bodyStyle={{
        color: "white",
      }}
      toastClassName="custom-toast"
    />
  );
}
