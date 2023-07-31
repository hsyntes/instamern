import Cookies from "js-cookie";

const updateMe = async ({ firstname, lastname, username, bio }) => {
  const response = await fetch("http://localhost:8000/instamern/users/update", {
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
