import { useState } from "react";
import Modal from "../ui/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ViewStory = ({ show, selectedStories, handleViewStory }) => {
  const [currentStory, setCurrentStory] = useState(0);

  // The next story
  const handleNextStory = () => {
    if (currentStory < selectedStories.length - 1)
      setCurrentStory(currentStory + 1);
  };

  // The previous story
  const handlePrevStory = () => {
    if (currentStory <= selectedStories.length && currentStory > 0)
      setCurrentStory(currentStory - 1);
  };

  return (
    <>
      <Modal
        show={show}
        className="relative overflow-hidden ps-0 pe-0 pt-0 pb-0 mx-6 lg:mx-0 w-5/6 lg:w-auto"
      >
        <div className="flex items-center my-2">
          {selectedStories &&
            selectedStories.map((selectedStory, index) => (
              <div
                key={selectedStory.storyId}
                className={
                  currentStory === index
                    ? "w-full mx-1 bg-primary"
                    : "w-full bg-dark dark:bg-white mx-1"
                }
                style={{ height: "2px" }}
              ></div>
            ))}
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-8 right-4 cursor-pointer text-white hover:text-primary"
          size="2x"
          style={{ zIndex: 1 }}
          onClick={handleViewStory}
        />
        <div className="relative flex items-center overflow-hidden">
          <FontAwesomeIcon
            className="absolute top-1/2 left-4 cursor-pointer text-white hover:text-primary drop-shadow-lg transition"
            icon={faAngleLeft}
            size="3x"
            onClick={handlePrevStory}
          />
          {selectedStories && (
            <img
              src={selectedStories[currentStory]?.photo}
              className="rounded w-96"
              alt="Story"
              style={{ userSelect: "none" }}
            />
          )}
          <FontAwesomeIcon
            className="absolute top-1/2 right-4 cursor-pointer text-white hover:text-primary drop-shadow-lg transition"
            icon={faAngleRight}
            size="3x"
            onClick={handleNextStory}
          />
        </div>
      </Modal>
    </>
  );
};

export default ViewStory;
