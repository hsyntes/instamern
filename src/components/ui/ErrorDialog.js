import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Button from "./Button";

const ErrorDialog = ({ show, message, handleErrorDialog }) => (
  <Modal show={show} handleModal={handleErrorDialog} className="w-3/4 lg:w-1/4">
    <Modal.Header>
      <h6 className="text-lg font-semibold mx-auto">Error</h6>
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute right-0 cursor-pointer text-gray-500 hover:text-dark hover:dark:text-white transition"
        size="xl"
        onClick={handleErrorDialog}
      />
    </Modal.Header>
    <Modal.Body>
      <p className="text-center">{message}</p>
    </Modal.Body>
    <Modal.Footer className="flex items-center justify-center">
      <Button
        type="button"
        variant="link"
        className="text-primary"
        onClick={handleErrorDialog}
      >
        Got it
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ErrorDialog;
