import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ErrorDialog from "../components/ui/ErrorDialog";
import Toast from "../components/ui/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import useInput from "../hooks/useInput";
import logo from "../logo.svg";

const ResetPassword = () => {
  // Get form data from the React-Router action func.
  const actionData = useActionData();
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  // Update the input values based on the custom hook
  const {
    state: {
      value: password,
      isValid: isPasswordValid,
      isError: isPasswordError,
    },
    handleOnChange: handlePasswordOnChange,
    handleOnBlur: handlePasswordOnBlur,
  } = useInput();

  const {
    state: {
      value: passwordConfirm,
      isValid: isPasswordConfirmValid,
      isError: isPasswordConfirmError,
    },
    handleOnChange: handlePasswordConfirmOnChange,
    handleOnBlur: handlePasswordConformOnBlur,
  } = useInput();

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

  // Set error/toast messages based on the action data
  useEffect(() => {
    if (actionData?.status === "fail") {
      setErrorDialog(true);
      setErrorMessage(actionData.message);
    }

    if (actionData?.status === "success") {
      setToast(true);
      setToastMessage(actionData.message);

      const identifier = setTimeout(() => navigate("/"), 3500);

      return () => clearTimeout(identifier);
    }
  }, [actionData, navigate]);

  // Update form validation
  useEffect(() => {
    const identifier = setTimeout(
      () => setIsFormValid(isPasswordValid && isPasswordConfirmValid),
      350
    );

    return () => clearTimeout(identifier);
  }, [isPasswordValid, isPasswordConfirmValid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container className="h-screen flex items-center justify-center my-8">
        <Card className="w-full mx-4 lg:w-2/4 lg:mx-0 lg:dark:bg-dark px-6 py-12 lg:px-12 lg:py-12 rounded lg:shadow-xl my-12">
          <Card.Header className="ps-0 mb-10">
            <Link to="/" id="brand" className="flex items-center">
              <img src={logo} width={56} alt="App" className="rounded-full" />
              <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-100% to-secondary">
                InstaMERN
              </h1>
            </Link>
          </Card.Header>
          <Form method="post" className="">
            <Card.Body>
              <div className="form-group relative mb-8">
                <Input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordOnChange}
                  onBlur={handlePasswordOnBlur}
                />
                {isPasswordError && (
                  <p className="text-danger mt-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className="ms-2">Password invalid.</span>
                  </p>
                )}
              </div>
              <div className="form-group relative mb-8">
                <Input
                  type="password"
                  name="password-confirm"
                  placeholder="Confrim new password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmOnChange}
                  onBlur={handlePasswordConformOnBlur}
                />
                {isPasswordConfirmError && (
                  <p className="text-danger mt-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className="ms-2">Password confirm failed.</span>
                  </p>
                )}
              </div>
            </Card.Body>
            <Card.Footer className="px-0 mt-2">
              <div className="form-group mb-8">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center py-4"
                  disabled={
                    !isFormValid ||
                    navigation.state === "submitting" ||
                    actionData
                  }
                >
                  {navigation.state === "submitting" ? (
                    <>
                      <Spinner size="sm" />
                      <span className="ms-2">Resetting your password</span>
                    </>
                  ) : (
                    <span>Set New Password</span>
                  )}
                </Button>
              </div>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
      <ErrorDialog
        show={errorDialog}
        message={errorMessage}
        handleErrorDialog={handleErrorDialog}
      />
      <Toast show={toast} message={toastMessage} />
    </>
  );
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();

  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/reset-password/${params.token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: formData.get("password"),
        passwordConfirm: formData.get("password-confirm"),
      }),
    }
  );

  const data = await response.json();

  return data;
};

export default ResetPassword;
