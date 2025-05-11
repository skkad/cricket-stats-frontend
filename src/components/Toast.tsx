import { CheckCircle, X, XCircle, TriangleAlert, Info } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  open: Boolean; // Control the visibility of the toast
  status: "success" | "error" | "info";
  duration?: number; // Duration in milliseconds
  onClose?: () => void; // Callback function to close the toast
}

const Toast = ({
  message,
  open,
  status,
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isClosing, setIsClosing] = useState<Boolean>(false);
  const getStatusStyle = () => {
    switch (status) {
      case "success":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <CheckCircle size={20} className="text-green-500" />,
        };
      case "error":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: <XCircle size={20} className="text-red-500" />,
        };
      case "info":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: <Info size={20} className="text-blue-500" />,
        };
      default:
        return {
          bg: "bg-orange-100",
          text: "text-orange-800",
          icon: <TriangleAlert size={20} className="text-orange-500" />,
        };
    }
  };
  const { bg, text, icon } = getStatusStyle();
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Match the duration of the animation
  };
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        // onClose();
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  return (
    <>
      {open && (
        <div
          className={`fixed flex items-center gap-2 bottom-4 right-4 z-50 w-80 p-2 rounded-lg shadow-lg ${bg} ${text}  ${
            isClosing ? "animation-slide-out" : "animation-slide-in"
          }`}
        >
          {icon}
          <div className={`flex-1 text-sm`}>{message}</div>
          <button
            className="ml-auto p-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
