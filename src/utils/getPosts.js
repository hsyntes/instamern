const getPosts = async () => {
  const response = await fetch("https://instamern-3cda0fa07039.herokuapp.com/instamern/posts");

  const { data } = await response.json();

  return data.posts;
};

export default getPosts;
