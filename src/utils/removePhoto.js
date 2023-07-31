import Cookies from "js-cookie";

const removePhoto = async () => {
  const response = await fetch("http://localhost:8000/instamern/users/remove", {
    method: "POST",
    headers: {
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
    },
  });

  const data = await response.json();

  return data;
};

export default removePhoto;
