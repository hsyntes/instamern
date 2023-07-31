const getUserById = async (id) => {
  const response = await fetch(
    `http://localhost:8000/instamern/users/id/${id}`
  );

  const { data } = await response.json();

  return data.user;
};

export default getUserById;
