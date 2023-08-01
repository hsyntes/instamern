import { useSelector } from "react-redux";
import EmptyPhoto from "./EmptyPhoto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UploadStory from "./UploadStory";

const AddStory = () => {
  const [uploadStory, setUploadStory] = useState(false);
  const userState = useSelector((state) => state.currentUser);
  const { currentUser } = userState;

  const handleUploadStory = () => {
    setUploadStory(!uploadStory);
  };

  return (
    currentUser && (
      <>
        <section className="me-4 pe-4 border-r-2 border-gray-300 dark:border-gray-700">
          <ul>
            <li>
              <center className="relative">
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    className="w-16 rounded-full hover:opacity-50 cursor-pointer transition"
                    alt="User"
                    onClick={handleUploadStory}
                  />
                ) : (
                  <EmptyPhoto
                    username={currentUser?.username}
                    size="52px"
                    onClick={handleUploadStory}
                  />
                )}
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="absolute bottom-0 right-1 text-primary"
                />
              </center>
              <p className="text-xs text-center mt-2">Add story</p>
            </li>
          </ul>
        </section>
        <UploadStory show={uploadStory} handleUploadStory={handleUploadStory} />
      </>
    )
  );
};

export default AddStory;
