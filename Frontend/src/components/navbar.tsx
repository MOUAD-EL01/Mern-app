import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logOut = () => {
    setCookie("access_token", "");
    localStorage.removeItem("UserId");
    navigate("/Login");
  };
  const buttonMenuExpand = useRef<HTMLButtonElement>(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const isUserLoggedIn = 0;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              ref={buttonMenuExpand}
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                // stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                // stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="text-white text-lg font-bold">
                YourLogo
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className=" hidden absolute inset-y-0 right-0 lg:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!Cookie.access_token ? (
              <>
                <Link
                  to="/Register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
              </>
            ) : (
              <div>
                {" "}
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium mx-4"
                  onClick={logOut}
                >
                  Logout
                </button>
                <Link
                  to="/espace-utilisateur"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Espace D'utilisateur
                </Link>
              </div>
            )}
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                // stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 absolute inset-0 z-10 w-screen h-screen flex items-center justify-center"
        >
          {" "}
          <div className="bg-gray-800  absolute inset-0 z-10 w-screen h-screen flex items-center justify-center">
            <div className=" absolute top-6 left-6">
              <button onClick={() => setIsOpen(false)}>
                <IoMdClose color="white" size={50} />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <Link
                to="/"
                className="bg-gray-900 uppercase text-xl pt-6  text-white rounded-md px-3 py-2  font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#"
                className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/#"
                className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {!Cookie.access_token ? (
                <>
                  <Link
                    to="/Register"
                    className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/Login"
                    className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="flex flex-col">
                  <Link
                    to="/espace-utilisateur"
                    className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Espace D'utilisateur
                  </Link>
                  <button
                    className="text-gray-300 uppercase text-xl pt-6 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  font-medium mx-4"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              )}{" "}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
