import Cookies from "js-cookie";

const logout = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/instamern/users/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Logout failed.");

    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};

export default logout;
