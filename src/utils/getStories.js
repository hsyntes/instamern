import Cookies from "js-cookie";

const getStories = async () => {
  const response = await fetch("http://localhost:8000/instamern/stories/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
    },
  });

  const { data } = await response.json();

  return data.stories;
};

export default getStories;
