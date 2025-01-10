import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, handleSingOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-5 md:mx-0 flex justify-between items-center bg-white text-black dark:bg-primary rounded-full py-2.5 my-5 sticky top-5 z-50">
      <div className="pl-5">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12" src={logo} alt="Logo" />
          <h2 className="hidden md:block font-black text-2xl font-sora">
            VISA NG
          </h2>
        </Link>
      </div>
      <div className="hidden lg:block">
        <div className="font-semibold text-p flex gap-5">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/allVisas">All Visas</NavLink>
          {user && (
            <>
              <NavLink to="/addVisa">Add Visa</NavLink>
              <NavLink to="/myAddedVisas">My Added Visas</NavLink>
              <NavLink to="/myVisaApplications">My Visa Applications</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <i className="fa-solid fa-moon text-black text-4xl"></i>
          ) : (
            <i className="fa-regular fa-moon text-4xl"></i>
          )}
        </button>
        {user ? (
          <div className="flex items-center gap-2 z-10">
            <div>
              <img
                data-tooltip-id="tooltip"
                data-tooltip-content={user?.displayName}
                className="w-12 rounded-full"
                src={user?.photoURL}
                alt="User"
              />
            </div>
            <button
              onClick={handleSingOut}
              className="hidden md:block bg-primary dark:bg-white font-bold lg:mr-3 py-3 px-8 rounded-full"
            >
              Sign Out
            </button>
            <button onClick={handleSingOut} className="block md:hidden">
              <i className="fa-solid fa-right-to-bracket text-4xl"></i>
            </button>
            <Tooltip id="tooltip" place="top" type="dark" effect="float" />
          </div>
        ) : (
          <div>
            <button className="hidden md:block bg-primary dark:bg-white font-bold lg:mr-3 py-3 px-8 rounded-full">
              <Link to="/signIn">Sign In</Link>
            </button>
            <button className="block md:hidden">
              <Link to="/signIn">
                <i className="fa-solid fa-user text-4xl"></i>
              </Link>
            </button>
          </div>
        )}
        <div className="block lg:hidden">
          <i
            className="fa-solid fa-bars-staggered text-4xl mr-4"
            onClick={toggleSidebar}
          ></i>
          <div
            className={`fixed z-10 left-0 top-0 h-screen w-2/3 md:w-1/3 bg-gray-800 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform`}
          >
            <i
              className="fa-solid fa-times text-white text-3xl absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            ></i>
            <nav className="flex flex-col text-white p-8 space-y-4">
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/allVisas" onClick={() => setIsOpen(false)}>
                All Visas
              </NavLink>
              {user && (
                <>
                  <NavLink to="/addVisa" onClick={() => setIsOpen(false)}>
                    Add Visa
                  </NavLink>
                  <NavLink to="/myAddedVisas" onClick={() => setIsOpen(false)}>
                    My Added Visas
                  </NavLink>
                  <NavLink
                    to="/myVisaApplications"
                    onClick={() => setIsOpen(false)}
                  >
                    My Visa Applications
                  </NavLink>
                  <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
