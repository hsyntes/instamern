const getUserByUsername = async (username) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/username/${username}`
  );

  const { data } = await response.json();

  return data.user;
};

export default getUserByUsername;
