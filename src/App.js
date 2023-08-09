import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { themeSliceActions } from "./store/theme/theme-slice";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AuthenticationPage from "./pages/Authentication";
import getCurrentUser from "./utils/getCurrentUser";
import { currentUserSliceActions } from "./store/user/user-slice";
import Splash from "./components/ui/Splash";
import SearchPage from "./pages/Search";
import NotificationPage from "./pages/Notification";
import UploadPage from "./pages/Upload";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import ChangeEmailPage from "./pages/ChangeEmail";
import ErrorPage from "./pages/Error";

// * Pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":username", element: <ProfilePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "notifications", element: <NotificationPage /> },
      { path: "upload", element: <UploadPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationPage />,
    action: ({ request }) =>
      import("./pages/Authentication").then((module) =>
        module.action({ request })
      ),
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
    action: ({ request }) =>
      import("./pages/ChangePassword").then((module) =>
        module.action({ request })
      ),
  },
  {
    path: "/change-email",
    element: <ChangeEmailPage />,
    action: ({ request }) =>
      import("./pages/ChangeEmail").then((module) =>
        module.action({ request })
      ),
  },
  {
    path: "/forgot-password/",
    element: <ForgotPasswordPage />,
    action: ({ request }) =>
      import("./pages/ForgotPassword").then((module) =>
        module.action({ request })
      ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    action: ({ params, request }) =>
      import("./pages/ResetPassword").then((module) =>
        module.action({ params, request })
      ),
  },
]);

function App() {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // * Fetching current user
  const { data: user, isLoading: isUserLoading } = useQuery("getCurrentUser", {
    queryFn: getCurrentUser,
  });

  const { theme } = themeState;

  // * Switching theme dynamically
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) =>
      dispatch(themeSliceActions.switchTheme(e.matches ? "dark" : "light"))
    );

  // * Setting current user to redux
  useEffect(() => {
    if (user) dispatch(currentUserSliceActions.setCurrentUser(user));
    else dispatch(currentUserSliceActions.setCurrentUser(null));
  }, [user, dispatch]);

  // * Implementing dark & light theme
  useEffect(() => {
    const [html, body] = [
      document.querySelector("html"),
      document.querySelector("body"),
    ];

    if (theme === "dark") html.className = "dark";
    else if (theme === "light") html.className = "";

    body.className = "bg-white text-dark dark:bg-black dark:text-white";
  }, [theme]);

  if (isUserLoading) return <Splash />;

  return <RouterProvider router={router} />;
}

export default App;
