import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Toast = ({ show, message }) => {
  if (!show) return null;

  return createPortal(
    <motion.div
      animate={{ opacity: [0.5, 1] }}
      transition={{ ease: "easeOut", duration: 0.35 }}
      className="w-auto bg-white border-2 border-slate-200 dark:border-0 dark:bg-dark shadow-xl rounded fixed bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 py-2 px-4"
    >
      <p>{message}</p>
    </motion.div>,
    document.getElementById("toast-root")
  );
};

export default Toast;
