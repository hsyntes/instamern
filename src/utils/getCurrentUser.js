import Cookies from "js-cookie";

const getCurrentUser = async () => {
  console.log(Cookies.get("jsonwebtoken"));
  if (!Cookies.get("jsonwebtoken")) return null;

  try {
    const response = await fetch(
      "https://instamern-3cda0fa07039.herokuapp.com/instamern/users/authorization/current-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            Cookies.get("jsonwebtoken") || localStorage.getItem("jsonwebtoken")
          }`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) return null;

    const { data } = await response.json();

    return data.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default getCurrentUser;
