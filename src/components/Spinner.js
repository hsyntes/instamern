import { motion } from "framer-motion";

const Spinner = ({ className, size }) => {
  const classes = `border-t-2 border-t-primary border-2 border-white ${className}`;
  return (
    <motion.div
      className={classes}
      style={{
        borderRadius: "100%",
        width: size === "sm" ? "16px" : "36px",
        height: size === "sm" ? "16px" : "36px",
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ ease: "easeOut", duration: 0.5, repeat: Infinity }}
    />
  );
};

export default Spinner;
