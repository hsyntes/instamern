import Cookies from "js-cookie";

const makeComment = async ({ postId, comment }) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/posts/comments/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
      },
      body: JSON.stringify({
        comment,
      }),
    }
  );

  const data = await response.json();

  return data;
};

export default makeComment;
