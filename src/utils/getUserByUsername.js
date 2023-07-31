const getUserByUsername = async (username) => {
  const response = await fetch(
    `http://localhost:8000/instamern/users/username/${username}`
  );

  const { data } = await response.json();

  return data.user;
};

export default getUserByUsername;
