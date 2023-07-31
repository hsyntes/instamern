import Cookies from "js-cookie";

const uploadPhoto = async ({ photo }) => {
  const response = await fetch("http://localhost:8000/instamern/users/upload", {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("jsonwebtoken")}`,
    },
    body: photo,
  });

  const data = await response.json();

  return data;
};

export default uploadPhoto;
