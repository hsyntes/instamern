import { useEffect, useState } from "react";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import useInput from "../../hooks/useInput";
import logo from "../../logo.svg";

const Login = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    state: { value: username, isValid: isUsernameValid },
    handleOnChange: handleUsernameOnChange,
    handleOnBlur: handleUsernameOnBlur,
  } = useInput();

  const {
    state: { value: password, isValid: isPasswordValid },
    handleOnChange: handlePasswordOnChange,
    handleOnBlur: handlePasswordOnBlur,
  } = useInput();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid(isUsernameValid && isPasswordValid);
    }, 200);

    return () => clearTimeout(identifier);
  }, [isUsernameValid, isPasswordValid]);

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
      <Form method="post">
        <Card.Body>
          <div className="form-group relative mb-8">
            <Input
              type="text"
              name="username"
              placeholder="@username"
              value={username}
              onChange={handleUsernameOnChange}
              onBlur={handleUsernameOnBlur}
            />
          </div>
          <div className="form-group relative mb-3">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordOnChange}
              onBlur={handlePasswordOnBlur}
            />
          </div>
          <div className="form-group flex">
            <Button
              type="button"
              variant="link"
              className="text-primary pe-0 ms-auto"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className="px-0 mt-2">
          <div className="form-group mb-8">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-4"
              disabled={!isFormValid || navigation.state === "submitting"}
            >
              Login
            </Button>
          </div>
          <div className="form-group text-center">
            <p>Don't have an account?</p>
            <Button
              type="button"
              variant="link"
              className="text-secondary text-lg cursor-pointer"
              onClick={() => navigate("/auth?mode=signup")}
            >
              Signup
            </Button>
          </div>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default Login;
