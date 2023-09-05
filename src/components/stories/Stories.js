import { useState } from "react";
import Sharer from "./Sharer";
import ViewStory from "./ViewStory";
import { useQueryClient } from "react-query";

const StoryLists = ({ items }) => {
  const [selectedStories, setSelectedStories] = useState(null);
  const [viewStory, setViewStory] = useState(false);
  const queryClient = useQueryClient();

  const handleViewStory = () => {
    setViewStory(!viewStory);

    queryClient.refetchQueries("getStories");
    queryClient.refetchQueries("getStories");
  };

  return (
    <>
      <ul className="flex items-center">
        {items?.map((item) => (
          <li key={item._id} className="mx-2">
            <Sharer
              storiedBy={item._id}
              onClick={() => {
                setSelectedStories(item.stories);
                handleViewStory();
              }}
            />
          </li>
        ))}
      </ul>
      {viewStory && (
        <ViewStory
          show={viewStory}
          selectedStories={selectedStories}
          handleViewStory={handleViewStory}
        />
      )}
    </>
  );
};

const Stories = ({ stories }) => <StoryLists items={stories} />;

export default Stories;
