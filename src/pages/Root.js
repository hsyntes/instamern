import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import Navbar from "../components/ui/Navbar";

const RootLayout = () => {
  return (
    //  Grid layout
    <div className="lg:grid lg:grid-cols-12">
      <div className="App mt-4 px-4 lg:mt-20 lg:px-20 col-span-10 order-1">
        <Header />
        <main className="my-12">
          <Outlet />
        </main>
      </div>
      <aside className="col-span-2 bg-light lg:bg-white dark:bg-dark dark:lg:bg-black">
        <Navbar />
      </aside>
    </div>
  );
};

export default RootLayout;
