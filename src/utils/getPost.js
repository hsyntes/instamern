const getPost = async (postId) => {
  if (!postId) return null;

  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/posts/${postId}`
  );

  const { data } = await response.json();

  return data.post;
};

export default getPost;
