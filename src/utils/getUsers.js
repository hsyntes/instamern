const getUsers = async () => {
  const response = await fetch("http://localhost:8000/instamern/users/");

  const { data } = await response.json();

  return data.users;
};

export default getUsers;
