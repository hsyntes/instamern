import Cookies from "js-cookie";

const uploadPost = async ({ post }) => {
  const response = await fetch(
    "https://instamern-3cda0fa07039.herokuapp.com/instamern/posts/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          Cookies.get("jsonwebtoken") || localStorage.getItem("jsonwebtoken")
        }`,
      },
      body: post,
    }
  );

  const data = await response.json();

  return data;
};

export default uploadPost;
