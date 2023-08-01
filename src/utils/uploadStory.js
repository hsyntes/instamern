import Cookies from "js-cookie";

const uploadStory = async ({ story }) => {
  const response = await fetch(
    "https://instamern-3cda0fa07039.herokuapp.com/instamern/stories/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          Cookies.get("jsonwebtoken") || localStorage.getItem("jsonwebtoken")
        }`,
      },
      body: story,
    }
  );

  const data = await response.json();

  return data;
};

export default uploadStory;
