const getUserById = async (id) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/id/${id}`
  );

  const { data } = await response.json();

  return data.user;
};

export default getUserById;
