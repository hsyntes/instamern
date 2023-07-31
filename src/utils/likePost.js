import Cookies from "js-cookie";

const likePost = async ({ postId }) => {
  const response = await fetch(
    `http://localhost:8000/instamern/posts/like/${postId}`,
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
