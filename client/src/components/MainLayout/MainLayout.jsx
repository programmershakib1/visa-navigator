import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";
import "animate.css";
import ScrollRestoration from "../ScrollRestoration/ScrollRestoration";

const MainLayout = () => {
  return (
    <div className="container mx-auto min-h-screen">
      <ScrollRestoration></ScrollRestoration>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
