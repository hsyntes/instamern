import { useEffect, useState } from "react";
import { useActionData, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import Container from "../components/ui/Container";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ErrorDialog from "../components/ui/ErrorDialog";

const AuthenticationPage = () => {
  // Get the query params
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Get the mode based on the query param
  const mode = searchParams.get("mode");

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  useEffect(() => {
    if (actionData?.status === "fail") {
      setErrorDialog(true);
      setErrorMessage(actionData.message);
    }

    if (actionData?.status === "success") {
      queryClient.refetchQueries("getUsers");
      queryClient.refetchQueries("getCurrentUser");

      navigate("/");
    }
  }, [actionData, queryClient, navigate]);

  return (
    <>
      <Container className="h-screen flex items-center justify-center my-8">
        {mode === "login" ? <Login /> : <Signup />}
      </Container>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        handleErrorDialog={handleErrorDialog}
      />
    </>
  );
};

// React-Router action
export const action = async ({ request }) => {
  // Get authentiocation mode based on the search query
  const searchParams = new URL(request.url).searchParams;

  // Get the current mode
  const mode = searchParams.get("mode");
  const formData = await request.formData();

  // login
  if (mode === "login") {
    const response = await fetch(
      "https://instamern-3cda0fa07039.herokuapp.com/instamern/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      }
    );

    const data = await response.json();

    localStorage.setItem("jsonwebtoken", data.token);

    return data;
  }

  // signup
  if (mode === "signup") {
    const response = await fetch(
      "https://instamern-3cda0fa07039.herokuapp.com/instamern/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.get("firstname"),
          lastname: formData.get("lastname"),
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
          passwordConfirm: formData.get("password-confirm"),
        }),
      }
    );

    const data = await response.json();

    localStorage.setItem("jsonwebtoken", data.token);

    return data;
  }
};

export default AuthenticationPage;
