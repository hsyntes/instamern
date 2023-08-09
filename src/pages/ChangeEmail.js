import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ErrorDialog from "../components/ui/ErrorDialog";
import Toast from "../components/ui/Toast";
import useInput from "../hooks/useInput";
import Cookies from "js-cookie";
import logo from "../logo.svg";

const ChangeEmailPage = () => {
  const actionData = useActionData();
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    state: {
      value: currentPassword,
      isValid: isCurrentPasswordValid,
      isError: isCurrentPasswordError,
    },
    handleOnChange: handleCurrentPasswordOnChange,
    handleOnBlur: handleCurrentPasswordOnBlur,
  } = useInput();

  const {
    state: { value: email, isValid: isEmailValid, isError: isEmailError },
    handleOnChange: handleEmailOnChange,
    handleOnBlur: handleEmailOnBlur,
  } = useInput();

  const handleErrorDialog = () => setErrorDialog(!errorDialog);

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

  useEffect(() => {
    const identifier = setTimeout(
      () => setIsFormValid(isCurrentPasswordValid && isEmailValid),
      350
    );

    return () => clearTimeout(identifier);
  }, [isCurrentPasswordValid, isEmailValid]);

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
                  name="current-password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordOnChange}
                  onBlur={handleCurrentPasswordOnBlur}
                />
                {isCurrentPasswordError && (
                  <p className="text-danger mt-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className="ms-2">Current password invalid.</span>
                  </p>
                )}
              </div>
              <div className="form-group relative mb-8">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailOnChange}
                  onBlur={handleEmailOnBlur}
                />
                {isEmailError && (
                  <p className="text-danger mt-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className="ms-2">Email invalid.</span>
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
                    <span>Set New Email</span>
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

export const action = async ({ request }) => {
  const formData = await request.formData();

  const response = await fetch(
    `https://instamern-3cda0fa07039.herokuapp.com/instamern/users/change-email`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          Cookies.get("jsonwebtoken") || localStorage.getItem("jsonwebtoken")
        }`,
      },
      body: JSON.stringify({
        currentPassword: formData.get("current-password"),
        email: formData.get("email"),
      }),
    }
  );

  const data = await response.json();

  return data;
};

export default ChangeEmailPage;
