import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import useInput from "../../hooks/useInput";
import Spinner from "../ui/Spinner";
import EmptyPhoto from "../ui/EmptyPhoto";
import Toast from "../ui/Toast";
import ErrorDialog from "../ui/ErrorDialog";
import updateMe from "../../utils/updateMe";
import uploadPhoto from "../../utils/uploadPhoto";
import removePhoto from "../../utils/removePhoto";

const EditProfile = ({ show, handleEditProfile }) => {
  const userState = useSelector((state) => state.currentUser);
  const queryClient = useQueryClient();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const selectPhotoRef = useRef();
  const navigate = useNavigate();

  const { currentUser } = userState;

  // Input values based on the custom hooks
  const {
    state: { value: firstname },
    handleOnChange: firstnameOnChange,
  } = useInput();

  const {
    state: { value: lastname },
    handleOnChange: lastnameOnChange,
  } = useInput();

  const {
    state: { value: username },
    handleOnChange: handleUsernameOnChange,
  } = useInput();

  const {
    state: { value: bio },
    handleOnChange: handleBioOnChange,
  } = useInput();

  const handleSelectPhoto = async (e) => {
    const photo = await e.target.files[0];
    if (photo) {
      setSelectedPhoto(photo);

      const reader = new FileReader();
      reader.onloadend = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(photo);
    }
  };

  const mutationUpdate = useMutation(updateMe, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        handleEditProfile();

        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        queryClient.invalidateQueries("getCurrentUser");
        queryClient.refetchQueries("getCurrentUser");
        queryClient.refetchQueries("getUserByUsername");

        handleEditProfile();

        navigate("/");
      }
    },
  });

  const mutationUpload = useMutation(uploadPhoto, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        setToast(true);
        setToastMessage(data.message);

        queryClient.refetchQueries("getUsers");
        queryClient.refetchQueries("getCurrentUser");
        queryClient.invalidateQueries("getCurrentUser");
        queryClient.refetchQueries("getUserByUsername");

        handleEditProfile();

        window.location.reload();
      }
    },
  });

  const mutationRemove = useMutation(removePhoto, {
    onSuccess: (data) => {
      if (data.status === "fail") {
        setErrorDialog(true);
        setErrorMessage(data.message);
      }

      if (data.status === "success") {
        queryClient.refetchQueries("getUsers");
        queryClient.refetchQueries("getCurrentUser");
        queryClient.invalidateQueries("getCurrentUser");
        queryClient.refetchQueries("getUserByUsername");

        handleEditProfile();

        window.location.reload();
      }
    },
  });

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    mutationUpload.mutate({ photo: formData });
  };

  const handleRemove = () => mutationRemove.mutate();

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutationUpdate.mutate({
      firstname: firstname || currentUser.firstname,
      lastname: lastname || currentUser.lastname,
      username: username || currentUser.username,
      bio: bio || currentUser.bio,
    });
  };

  return (
    <>
      <Modal show={show} className="w-11/12 lg:w-2/4 xl:w-1/4 py-8">
        <Modal.Header>
          <h6 className="text-lg font-semibold mx-auto">Edit Profile</h6>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute right-0 cursor-pointer text-gray-500 hover:text-dark hover:dark:text-white transition"
            size="xl"
            onClick={() => {
              handleEditProfile();
            }}
          />
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          {mutationUpload.isLoading || mutationUpdate.isLoading ? (
            <center className="my-8">
              <Spinner />
            </center>
          ) : (
            <>
              <center className="my-8">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  ref={selectPhotoRef}
                  accept="image/*"
                  onChange={handleSelectPhoto}
                  className="hidden"
                />
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    if (selectPhotoRef.current) selectPhotoRef.current.click();
                  }}
                >
                  {selectedPhoto ? (
                    <div
                      className="rounded-full"
                      style={{
                        width: "96px",
                        height: "96px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={previewPhoto}
                        className="w-full h-full rounded-full object-cover"
                        alt="Preview"
                      />
                    </div>
                  ) : currentUser.photo ? (
                    <div
                      className="rounded-full"
                      style={{
                        width: "96px",
                        height: "96px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={currentUser.photo}
                        className="w-full h-full rounded-full object-cover"
                        style={{ opacity: 0.25 }}
                        alt="User"
                      />
                    </div>
                  ) : (
                    <EmptyPhoto
                      username={currentUser.username}
                      size="96px"
                      fontSize="48px"
                      opacity={0.25}
                    />
                  )}
                  {!previewPhoto && (
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="xl"
                      opacity={0.7}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
                {previewPhoto ? (
                  <Button
                    type="button"
                    variant="black"
                    className="flex items-center my-4"
                    onClick={handleUpload}
                  >
                    <span className="me-1">Change Profile Photo</span>
                    <FontAwesomeIcon icon={faCheck} size="lg" />
                  </Button>
                ) : mutationRemove.isLoading ? (
                  <center className="my-4">
                    <Spinner size="sm" />
                  </center>
                ) : (
                  currentUser?.photo && (
                    <Button
                      type="button"
                      variant="black"
                      className="flex items-center my-4"
                      onClick={handleRemove}
                    >
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                      <span className="ms-1">Remove Photo</span>
                    </Button>
                  )
                )}
              </center>
              {!previewPhoto && !selectedPhoto && (
                <>
                  <Modal.Body>
                    <div className="form-group relative mb-8">
                      <Input
                        type="text"
                        name="firstname"
                        placeholder="Firstname"
                        value={firstname || currentUser.firstname}
                        onChange={firstnameOnChange}
                        className="!bg-dark"
                      />
                    </div>
                    <div className="form-group relative mb-8">
                      <Input
                        type="text"
                        name="lastname"
                        placeholder="Lastname"
                        value={lastname || currentUser.lastname}
                        onChange={lastnameOnChange}
                        className="!bg-dark"
                      />
                    </div>
                    <div className="form-group relative mb-8">
                      <Input
                        type="text"
                        name="username"
                        placeholder="@username"
                        value={username || currentUser.username}
                        onChange={handleUsernameOnChange}
                        className="!bg-dark"
                      />
                    </div>
                    <div className="form-group relative mb-8">
                      <Input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={bio || currentUser.bio}
                        onChange={handleBioOnChange}
                        className="!bg-dark"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="flex items-center justify-end">
                    <Button type="submit" variant="primary">
                      {mutationUpdate.isLoading ? (
                        <div className="flex items-center">
                          <Spinner size="sm" />
                          <span className="ms-3">Saving</span>
                        </div>
                      ) : (
                        <span>Save</span>
                      )}
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </>
          )}
        </form>
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

export default EditProfile;
