import Cookies from "js-cookie";

const likePost = async ({ postId }) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/posts/like/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export default likePost;
