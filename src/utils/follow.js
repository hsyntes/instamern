import Cookies from "js-cookie";

const follow = async ({ type, username }) => {
  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/${type}/${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export default follow;
