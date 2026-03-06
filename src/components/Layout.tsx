import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* This is where the nested routes will be rendered */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
