import { toast, ToastOptions } from "react-toastify";
import ToastAlert from "@/components/ToastAlert";

type Colors = "success" | "error";

interface ToastAlertProps {
  color?: Colors;
  message?: string;
}

export default function useCustomToast() {
  return (options: ToastOptions<ToastAlertProps>) => toast(<ToastAlert />, options);
}
