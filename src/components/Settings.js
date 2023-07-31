import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "./Button";
import Spinner from "./Spinner";

const Settings = ({ show, handleSettings, handleLogout, isLoading }) => (
  <Modal show={show} className="w-3/4 lg:w-1/4">
    {isLoading ? (
      <center>
        <Spinner className="my-4" />
      </center>
    ) : (
      <>
        <Modal.Header className="mb-12">
          <h6 className="text-lg font-semibold mx-auto">Settings</h6>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute right-0 cursor-pointer text-gray-500 hover:text-dark hover:dark:text-white transition"
            size="xl"
            onClick={handleSettings}
          />
        </Modal.Header>
        <Modal.Body className="mb-0">
          <ul className="text-center">
            <li>
              <Link
                to="/change-password"
                className="block w-full rounded hover:bg-light dark:hover:bg-black p-2 transition"
              >
                Change Password
              </Link>
            </li>
            <li className="my-4">
              <Link
                to="/change-email"
                className="block w-full rounded hover:bg-light dark:hover:bg-black p-2 transition"
              >
                Change Email Address
              </Link>
            </li>
            <li>
              <Button
                type="button"
                variant="link"
                className="text-danger hover:text-red-700 transition"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </li>
          </ul>
        </Modal.Body>
      </>
    )}
  </Modal>
);

export default Settings;
