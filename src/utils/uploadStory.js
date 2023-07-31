import Cookies from "js-cookie";

const uploadStory = async ({ story }) => {
  const response = await fetch(
    "http://localhost:8000/instamern/stories/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
      },
      body: story,
    }
  );

  const data = await response.json();

  return data;
};

export default uploadStory;
