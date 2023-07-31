import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmptyPhoto from "./EmptyPhoto";

const Navbar = () => {
  const userState = useSelector((state) => state.currentUser);

  const NAVLINKS = [
    { to: "/", icon: faHome },
    { to: "search", icon: faSearch },
    { to: "upload", icon: faPlusCircle },
    { to: "notifications", icon: faBell },
  ];

  const { currentUser } = userState;

  return (
    <nav className="lg:flex lg:items-center lg:justify-center lg:border-l-2 lg:border-gray-400 lg:dark:border-gray-500 lg:px-2">
      <ul>
        {NAVLINKS.map((navLink, index) => (
          <li key={index} className="lg:my-6 lg:mx-0">
            <NavLink
              to={navLink.to}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link text-gray-500 hover:dark:bg-dark hover:dark:text-light hover:bg-light hover:text-dark transition"
              }
            >
              <FontAwesomeIcon icon={navLink.icon} size="xl" />
            </NavLink>
          </li>
        ))}
        <li className="lg:my-6 lg:mx-0 text-center">
          {currentUser ? (
            <NavLink
              to={`${currentUser.username}`}
              className="nav-link text-gray-400 hover:dark:bg-dark hover:dark:text-light hover:bg-light hover:text-dark transition"
            >
              {currentUser.photo ? (
                <img
                  src={currentUser.photo}
                  width={36}
                  className="rounded-full border-2 border-secondary"
                  alt="User"
                />
              ) : (
                <EmptyPhoto username={currentUser.username} size="36px" />
              )}
            </NavLink>
          ) : (
            <NavLink
              to="/auth?mode=signup"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link text-gray-400 hover:dark:bg-dark hover:dark:text-light hover:bg-light hover:text-dark transition"
              }
            >
              <FontAwesomeIcon icon={faUser} size="xl" />
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
