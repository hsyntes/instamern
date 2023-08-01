import { useEffect, useState } from "react";
import { useActionData, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import Container from "../components/Container";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ErrorDialog from "../components/ErrorDialog";

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode");
  const formData = await request.formData();

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
        credentials: true,
      }
    );

    const data = await response.json();

    return data;
  }

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
        credentials: true,
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      const loginResponse = await fetch(
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

      const loginData = await loginResponse.json();

      return loginData;
    }

    return data;
  }
};

export default AuthenticationPage;
