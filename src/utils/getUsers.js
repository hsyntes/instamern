const getUsers = async () => {
  const response = await fetch("https://instamern-3cda0fa07039.herokuapp.com/instamern/users/");

  const { data } = await response.json();

  return data.users;
};

export default getUsers;
