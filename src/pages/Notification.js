import { useSelector } from "react-redux";
import Container from "../components/ui/Container";
import NotificationLists from "../components/notifications/NotificationLists";
import logo from "../logo.svg";
import { useEffect } from "react";

const NotificationPage = () => {
  const userState = useSelector((state) => state.currentUser);
  const { currentUser } = userState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <h6 className="font-semibold text-2xl">Notifications</h6>
      <section className="mt-3">
        <ul className="rounded lg:w-3/4">
          <li className="flex items-start bg-light dark:bg-dark rounded p-4">
            <img src={logo} width={36} alt="App" />
            <section className=" dark:text-gray-300 ms-2">
              <p>
                Welcome to my application! <strong>InstaMERN</strong> is a
                Full-Stack Web Application like <strong>Instagram</strong>. It
                includes advanced features such as &nbsp;
                <strong>Authentication</strong>, <strong>Authorization</strong>
                ,&nbsp;
                <strong>security</strong> and some &nbsp;
                <strong>AWS Cloud Computing</strong> services. (Cloud Storage &
                Email).
              </p>
              <br />
              <p>
                You can contact me on{" "}
                <a
                  href="https://www.linkedin.com/in/hsyntes"
                  className="font-semibold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>{" "}
                &{" "}
                <a
                  href="https://www.github.com/hsyntes"
                  className="font-semibold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
                . Feel free to ask me anything about the application.
              </p>
            </section>
          </li>
          {currentUser?.notifications?.map((notification) => (
            <NotificationLists
              item={notification}
              key={`${notification._id}`}
            />
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default NotificationPage;
