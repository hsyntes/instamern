const searchUsers = async (username) => {
  const response = await fetch(
    `http://localhost:8000/instamern/users/search/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await response.json();

  return data.users;
};

export default searchUsers;
