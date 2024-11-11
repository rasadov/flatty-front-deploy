// src/components/Notification.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react-refresh/only-export-components
export const notify = (message) => toast(message);

export default function Notification() {
  return <ToastContainer position="top-center" autoClose={5000} />;
}
