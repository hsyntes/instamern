import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Container from "../components/Container";
import Button from "../components/Button";
import ErrorDialog from "../components/ErrorDialog";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import useInput from "../hooks/useInput";
import uploadPost from "../utils/uploadPost";

const UploadPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.currentUser);
  const { currentUser } = userState;

  const handleErrorDialog = () => {
    setErrorDialog(false);
    setErrorMessage(null);

    navigate("/");
  };

  const selectPhotoRef = useRef();

  const handleSelectPhoto = async (e) => {
    const photo = await e.target.files[0];
    if (photo) {
      setSelectedPhoto(photo);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(photo);
    }
  };

  const mutationUpload = useMutation(uploadPost, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setToast(true);
        setToastMessage(data.message);

        queryClient.refetchQueries("getPosts");

        // navigate("/");

        window.location.reload();
      }
    },
  });

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("post", selectedPhoto);
    formData.append("caption", caption);

    mutationUpload.mutate({ post: formData });
  };

  const {
    state: { value: caption },
    handleOnChange: handleCaptionChange,
  } = useInput();

  useEffect(() => {
    if (!currentUser) {
      setErrorDialog(true);
      setErrorMessage("Please log in to share posts.");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Container
        className="flex flex-col lg:flex-row lg:grid lg:grid-cols-12 rounded border relative dark:border-gray-800"
        style={{ height: "70vh" }}
      >
        {mutationUpload.isLoading ? (
          <center className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
            <p className="my-3">Your post is uploading</p>
          </center>
        ) : (
          <>
            <input
              type="file"
              id="photo"
              name="photo"
              ref={selectPhotoRef}
              accept="image/*"
              onChange={handleSelectPhoto}
              className="hidden"
            />
            <section
              className="col-span-8 h-full flex items-start lg:items-center justify-center rounded-l cursor-pointer lg:border-r lg:border-gray-800 overflow-hidden"
              onClick={() => {
                if (selectPhotoRef.current) selectPhotoRef.current.click();
              }}
            >
              <center className={!previewPhoto ? "self-center" : undefined}>
                {!previewPhoto ? (
                  <>
                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-gray-500"
                      size="10x"
                    />
                    <p className="font-light">Upload a photo</p>
                  </>
                ) : (
                  <img
                    src={previewPhoto}
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectPosition: "center",
                    }}
                    alt="Post"
                  />
                )}
              </center>
            </section>
            <section className="col-span-4 p-4 mt-auto relative lg:mt-0">
              <Button
                type="button"
                variant="link"
                className="text-primary absolute top-2 right-0 hidden lg:block"
                onClick={handleUpload}
                disabled={!selectedPhoto || mutationUpload.isLoading}
              >
                Share
              </Button>
              <textarea
                name="caption"
                value={caption}
                onChange={handleCaptionChange}
                className="form-input block w-full bg-white dark:bg-black border-0 border-b-2 ps-0 focus:ring-0 focus:border-b-secondary transition lg:pt-6"
                placeholder="Add a post caption"
                style={{ height: "100%", resize: "none" }}
                rows={1}
              />
            </section>
          </>
        )}
      </Container>
      <Button
        type="button"
        variant="primary"
        className="text-primary w-full py-3 mt-3 mb-12 block lg:hidden"
        onClick={handleUpload}
        disabled={!selectedPhoto || mutationUpload.isLoading}
      >
        Share
      </Button>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        handleErrorDialog={handleErrorDialog}
      />
      <Toast show={toast} message={toastMessage} />
    </>
  );
};

export default UploadPage;
