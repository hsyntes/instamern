const getPosts = async () => {
  const response = await fetch("http://localhost:8000/instamern/posts");

  const { data } = await response.json();

  return data.posts;
};

export default getPosts;
