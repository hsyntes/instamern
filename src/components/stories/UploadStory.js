import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faImage,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import uploadStory from "../../utils/uploadStory";
import ErrorDialog from "../ui/ErrorDialog";
import Toast from "../ui/Toast";

const UploadStory = ({ show, handleUploadStory }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();
  const selectPhotoRef = useRef();
  const queryClient = useQueryClient();

  // Get the story photo from user's device
  const handleSelectPhoto = async (e) => {
    const photo = await e.target.files[0];

    if (photo) {
      setSelectedPhoto(photo);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(photo);
    }
  };

  // Upload the story
  const mutationUpload = useMutation(uploadStory, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setToast(true);
        setToastMessage(data.message);

        queryClient.refetchQueries("getStories");

        handleUploadStory();

        navigate("/");
      }
    },
  });

  // Add story photo on the form data
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("story", selectedPhoto);

    mutationUpload.mutate({ story: formData });
  };

  const handleErrorDialog = () => {
    setErrorDialog(false);
    setErrorMessage(null);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (toast) {
        setToast(false);
        setToastMessage(null);
      }
    }, 2000);

    return () => clearTimeout(identifier);
  }, [toast, setToast, setToastMessage]);

  return (
    <>
      <Modal
        show={show}
        className="flex items-center justify-center w-screen rounded-none lg:w-1/4 lg:rounded h-screen lg:h-5/6 relative overflow-hidden ps-0 pe-0 pt-0 pb-0"
      >
        <input
          type="file"
          id="photo"
          name="photo"
          ref={selectPhotoRef}
          accept="image/*"
          onChange={handleSelectPhoto}
          className="hidden"
        />
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-4 right-4 cursor-pointer hover:text-primary"
          size="xl"
          style={{ zIndex: 1 }}
          onClick={handleUploadStory}
        />
        <Modal.Body
          className="w-11/12 overflow-hidden"
          onClick={() => {
            if (selectPhotoRef.current) selectPhotoRef.current.click();
          }}
        >
          <center>
            {mutationUpload.isLoading ? (
              <>
                <Spinner />
                <p className="my-3">Your story is uploading</p>
              </>
            ) : !previewPhoto ? (
              <>
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-gray-500 cursor-pointer"
                  size="10x"
                />
                <p className="font-light my-3">Upload a story</p>
              </>
            ) : (
              <img
                src={previewPhoto}
                className="rounded w-full cursor-pointer"
                alt="Story"
              />
            )}
          </center>
        </Modal.Body>
        {selectedPhoto && (
          <Button
            type="button"
            variant="primary"
            className="absolute flex items-center bottom-4 right-4"
            onClick={handleUpload}
            disabled={!selectedPhoto || mutationUpload.isLoading}
          >
            <span className="me-2">Share</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        )}
      </Modal>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        handleErrorDialog={handleErrorDialog}
      />
      <Toast show={toast} message={toastMessage} />
    </>
  );
};

export default UploadStory;
