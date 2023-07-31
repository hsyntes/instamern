import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import Spinner from "./Spinner";
import useInput from "../hooks/useInput";
import logo from "../logo.svg";

const Signup = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    state: {
      value: firstname,
      isValid: isFirstnameValid,
      isError: isFirstnameError,
    },
    handleOnChange: handleFirstnameOnChange,
    handleOnBlur: handleFirstnameOnBlur,
  } = useInput();

  const {
    state: {
      value: lastname,
      isValid: isLastnameValid,
      isError: isLastnameError,
    },
    handleOnChange: handleLastnameOnChange,
    handleOnBlur: handleLastnameOnBlur,
  } = useInput();

  const {
    state: {
      value: username,
      isValid: isUsernameValid,
      isError: isUsernameError,
    },
    handleOnChange: handleUsernameOnChange,
    handleOnBlur: handleUsernameOnBlur,
  } = useInput();

  const {
    state: { value: email, isValid: isEmailValid, isError: isEmailError },
    handleOnChange: handleEmailOnChange,
    handleOnBlur: handleEmailOnBlur,
  } = useInput();

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
    handleOnChange: hanldePasswordConfirmOnChange,
    handleOnBlur: handlePasswordConfirmOnBlur,
  } = useInput();

  useEffect(() => {
    const identifier = setTimeout(
      () =>
        setIsFormValid(
          isFirstnameValid &&
            isLastnameValid &&
            isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isPasswordConfirmValid
        ),
      350
    );

    return () => clearTimeout(identifier);
  }, [
    isFirstnameValid,
    isLastnameValid,
    isUsernameValid,
    isEmailValid,
    isPasswordValid,
    isPasswordConfirmValid,
  ]);

  if (navigation.state === "submitting") return <Spinner />;

  return (
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
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={firstname}
              onChange={handleFirstnameOnChange}
              onBlur={handleFirstnameOnBlur}
            />
            {isFirstnameError && (
              <p className="text-danger mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} />
                <span className="ms-2">Firstname invalid.</span>
              </p>
            )}
          </div>
          <div className="form-group relative mb-8">
            <Input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={lastname}
              onChange={handleLastnameOnChange}
              onBlur={handleLastnameOnBlur}
            />
            {isLastnameError && (
              <p className="text-danger mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} />
                <span className="ms-2">Lastname invalid.</span>
              </p>
            )}
          </div>
          <div className="form-group relative mb-8">
            <Input
              type="text"
              name="username"
              placeholder="@username"
              value={username}
              onChange={handleUsernameOnChange}
              onBlur={handleUsernameOnBlur}
            />
            {isUsernameError && (
              <p className="text-danger mt-2">
                <FontAwesomeIcon icon={faExclamationCircle} />
                <span className="ms-2">Username invalid.</span>
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
          <div className="form-group relative mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
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
              placeholder="Password confirm"
              value={passwordConfirm}
              onChange={hanldePasswordConfirmOnChange}
              onBlur={handlePasswordConfirmOnBlur}
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
              className="w-full py-4"
              disabled={!isFormValid}
            >
              Signup
            </Button>
          </div>
          <div className="form-group text-center">
            <p>Have you an account?</p>
            <Button
              type="button"
              variant="link"
              className="text-secondary text-lg"
              onClick={() => navigate("/auth?mode=login")}
            >
              Login
            </Button>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default Signup;
