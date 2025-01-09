import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mx-5 md:mx-0 mt-20">
      <img className="mx-auto" src={logo} alt="" />
      <h2 className="md:text-5xl text-2xl font-bold text-center font-sora">
        VISA NAVIGATOR
      </h2>
      <p className="text-center font-semibold mb-10 mt-3 lg:mx-52">
        Explore a world of opportunities with Visa Navigator. Your one-stop
        solution for visa applications, requirements, and guidance. Stay
        informed, make informed decisions, and embark on your next journey with
        ease.
      </p>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="text-left mt-5 md:mt-0">
          <h4 className="text-2xl font-bold mb-3 lg:mb-5">Contact Us</h4>
          <p>
            <i className="fa-solid fa-location-dot"></i> 123 Port Lane, NY 56789
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> support@visanavigator.com
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +1-800-VISA
          </p>
          <div className="flex items-center gap-4 mt-3">
            <a href="#" target="_blank">
              <i className="fa-brands fa-facebook text-3xl"></i>
            </a>
            <a href="#" target="_blank">
              <i className="fa-brands fa-instagram text-3xl"></i>
            </a>
            <a href="#" target="_blank">
              <i className="fa-brands fa-twitter text-3xl"></i>
            </a>
          </div>
        </div>
        <div className="text-left mt-5 md:mt-0">
          <h4 className="text-2xl font-bold mb-3 md:mb-5">About Us</h4>
          <p className="hover:underline">Privacy Policy</p>
          <p className="hover:underline">Terms of Service</p>
          <p className="hover:underline">User Guide</p>
          <p className="hover:underline">Contact Support</p>
          <p className="hover:underline">Accessibility</p>
        </div>
        <div>
          <h4 className="text-2xl font-bold mb-3 md:mb-5">Quick access</h4>
          <div className="flex flex-col text-left">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/allVisas" className="hover:underline">
              All Visas
            </Link>
            {user && (
              <>
                <Link to="/addVisa" className="hover:underline">
                  Add Visa
                </Link>
                <Link to="/myAddedVisas" className="hover:underline">
                  My Added Visas
                </Link>
                <Link to="/myVisaApplications" className="hover:underline">
                  My Visa Applications
                </Link>
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border border-black dark:border-white mt-5"></div>
      <p className="text-center font-medium my-8">
        © 2024 VISA NAVIGATOR. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
