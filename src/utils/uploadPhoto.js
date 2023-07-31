import Cookies from "js-cookie";

const uploadPhoto = async ({ photo }) => {
  const response = await fetch("https://instamern-3cda0fa07039.herokuapp.com/instamern/users/upload", {
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
