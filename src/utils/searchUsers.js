const searchUsers = async (username) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/search/${username}`,
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
