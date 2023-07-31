const getPost = async (postId) => {
  if (!postId) return null;

  const response = await fetch(
    `http://localhost:8000/instamern/posts/${postId}`
  );

  const { data } = await response.json();

  return data.post;
};

export default getPost;
