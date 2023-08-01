import Cookies from "js-cookie";

const removePhoto = async () => {
  const response = await fetch(
    "https://instamern-3cda0fa07039.herokuapp.com/instamern/users/remove",
    {
      method: "POST",
      headers: {
        //   "Content-Type": "application/json",
        Authorization: `Bearer ${
          Cookies.get("jsonwebtoken") || localStorage.getItem("jsonwebtoken")
        }`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export default removePhoto;
