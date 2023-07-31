import Cookies from "js-cookie";

const updateMe = async ({ firstname, lastname, username, bio }) => {
  const response = await fetch("https://instamern-3cda0fa07039.herokuapp.com/instamern/users/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
    },
    body: JSON.stringify({ firstname, lastname, username, bio }),
  });

  const data = await response.json();


  return data;
};

export default updateMe;
