import Cookies from "js-cookie";

const uploadPost = async ({ post }) => {
  const response = await fetch("http://localhost:8000/instamern/posts/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
    },
    body: post,
  });

  const data = await response.json();

  return data;
};

export default uploadPost;
