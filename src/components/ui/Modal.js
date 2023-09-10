import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ show, className, handleModal, children }) => {
  useEffect(() => {
    const body = document.querySelector("body");

    if (show) body.style.overflow = "hidden";
    else body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  const classes = `modal bg-white dark:bg-dark rounded p-5 shadow-lg ${className}`;

  document.body.addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-backdrop")) handleModal();
  });

  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape") handleModal();
  });

  return createPortal(
    <div id="modal-backdrop" style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ opacity: [0.75, 1], scale: [1.1, 1] }}
        transition={{ ease: "easeOut", duration: 0.15 }}
        className={classes}
      >
        {children}
      </motion.div>
    </div>,
    document.getElementById("modal-root")
  );
};

const ModalHeader = ({ className, children }) => {
  const classes = `modal-header flex items-center relative ${className}`;
  return <div className={classes}>{children}</div>;
};

const ModalBody = ({ className, children, onClick }) => {
  const classes = `modal-body my-8 ${className}`;
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

const ModalFooter = ({ className, children }) => {
  const classes = `modal-footer ${className}`;
  return <div className={classes}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
