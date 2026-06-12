import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex grow justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
