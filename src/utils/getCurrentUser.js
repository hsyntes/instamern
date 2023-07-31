import Cookies from "js-cookie";

const getCurrentUser = async () => {
  if (!Cookies.get("jsonwebtoken")) return null;

    const response = await fetch(
      "http://localhost:8000/instamern/users/authorization/current-user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
        },
      }
    );

    
    if (!response.ok) return null;

    const { data } = await response.json();

    return data.user;
};

export default getCurrentUser;
