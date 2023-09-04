import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import Container from "./Container";
import Brand from "./Brand";
import Settings from "./Settings";
import logout from "../../utils/logout";
import Cookies from "js-cookie";
import logo from "../../logo.svg";

const Header = () => {
  const [settings, setSettings] = useState(false);
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const { currentUser } = userState;

  // Logout functionality
  const mutationLogout = useMutation(logout, {
    onSuccess: () => {
      Cookies.remove("jsonwebtoken");
      localStorage.clear();

      setSettings(false);

      queryClient.invalidateQueries("logout");
      queryClient.refetchQueries("getCurrentUser");

      window.location.reload();

      navigate("/");
    },
  });

  const handleSettings = () => setSettings(!settings);
  const handleLogout = () => mutationLogout.mutate({});

  return (
    <>
      <Container>
        <header className="mx-auto flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="App" className="rounded-full w-10" />
            <Brand className="text-2xl lg:text-3xl" />
          </Link>
          {!currentUser && (
            <Button
              type="button"
              variant="primary"
              className="ms-auto"
              onClick={() => navigate("auth?mode=signup")}
            >
              Signup
            </Button>
          )}
          {currentUser && (
            <section className="ms-auto">
              <FontAwesomeIcon
                icon={faBars}
                size="xl"
                className="hover:text-secondary cursor-pointer transition"
                onClick={handleSettings}
              />
            </section>
          )}
        </header>
      </Container>
      <Settings
        show={settings}
        handleSettings={handleSettings}
        handleLogout={handleLogout}
        isLoading={mutationLogout.isLoading}
      />
    </>
  );
};

export default Header;
