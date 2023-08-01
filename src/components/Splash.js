import { createPortal } from "react-dom";
import logo from "../logo.svg";
import Brand from "./Brand";

const Splash = () =>
  createPortal(
    <div id="splash-backdrop" className="bg-white dark:bg-dark">
      <img src={logo} alt="Logo" className="relative" />
      <Brand className="text-4xl lg:text-5xl absolute bottom-24 lg:bottom-14" />
    </div>,
    document.getElementById("modal-root")
  );

export default Splash;
