import Container from "../components/ui/Container";
import logo from "../logo.svg";

const ErrorPage = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="Logo" />
      <h1 className="font-semibold text-4xl text-center">
        Something <br /> went wrong 🥺
      </h1>
    </Container>
  );
};

export default ErrorPage;
