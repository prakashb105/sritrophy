// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/logo.jpg";
// import { signOut } from "firebase/auth";
// import { auth } from "../utils/firebaseConfig";
// import { trackAuthState } from "../utils/auth";

// const NavBar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   // Track authentication state
//   useEffect(() => {
//     const unsubscribe = trackAuthState(setUser);
//     return () => unsubscribe();
//   }, []);

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setShowLogoutDialog(true); // Show logout popover
//       console.log("User logged out successfully");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const navItems = {
//     Sports: "/sports",
//     Brochure: "/brochure",
//     "Contact Us": "/contact",
//   };

//   return (
//     <>
//     <header className="lg:px-8 px-4 flex flex-wrap items-center py-2 shadow-md bg-primary text-secondary relative">
//       {/* Logo Section */}
//       <img src={Logo} alt="sritrophy_logo" className="w-logo border rounded-full me-3" />
//       <div className="flex-1 flex justify-between items-center">
//         <Link to="/" onClick={() => setMenuOpen(false)} className="text-xl font-bold">
//           SRI TROPHY
//         </Link>
//       </div>

//       {/* Menu Toggle Button */}
//       <button
//         onClick={() => setMenuOpen(!menuOpen)}
//         className="w-14 h-16 relative focus:outline-none rounded md:hidden block"
//         aria-expanded={menuOpen}
//         aria-label="Toggle navigation"
//       >
//         <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <span className={`block absolute h-0.5 w-7 bg-secondary transform transition duration-500 ease-in-out ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`}></span>
//           <span className={`block absolute h-0.5 w-7 bg-secondary transform transition duration-500 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
//           <span className={`block absolute h-0.5 w-7 bg-secondary transform transition duration-500 ease-in-out ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`}></span>
//         </div>
//       </button>

//       {/* Navigation Menu */}
//       <nav
//         className={`md:flex md:items-center md:w-auto w-full absolute left-0 top-20 bg-primary z-20 transition-all duration-500 ease-in-out ${
//           menuOpen ? "block" : "hidden"
//         } md:static md:block`}
//         aria-hidden={!menuOpen}
//       >
//         <ul className="md:flex items-center justify-center text-base pt-4 md:pt-0 text-secondary font-bold space-y-4 md:space-y-0 md:space-x-6 text-center">
//           {Object.entries(navItems).map(([name, path]) => (
//             <li key={name}>
//               <Link to={path} onClick={() => setMenuOpen(false)} className="relative md:px-0 md:p-3 md:mx-3 pb-2 block group hover:underline-animation">
//                 {name}
//                 <span className="hidden md:block absolute left-0 bottom-2 w-0 h-0.5 bg-secondary transition-all duration-300 ease-out group-hover:w-full"></span>
//               </Link>
//             </li>
//           ))}

//           {/* Show Dashboard only if user is logged in */}
//           {user && (
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={() => setMenuOpen(false)}
//                 className="relative md:px-0 md:p-3 md:mx-3 pb-2 block group hover:underline-animation"
//               >
//                 Dashboard
//                 <span className="hidden md:block absolute left-0 bottom-2 w-0 h-0.5 bg-secondary transition-all duration-300 ease-out group-hover:w-full"></span>
//               </Link>
//             </li>
//           )}

//           {/* Login / Logout Button (Fixed Alignment) */}
//     <li className="w-full md:w-auto flex justify-center">
//       {user ? (
//         <button
//           onClick={handleLogout}
//           className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300 w-full md:w-auto"
//         >
//           Logout
//         </button>
//       ) : (
//         <Link
//           to="/login"
//           className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300 w-full md:w-auto"
//         >
//           Login
//         </Link>
//       )}
//     </li>
//   </ul>
// </nav>
//     </header>
//     {/* Logout Confirmation Dialog */}
//     {showLogoutDialog && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-95 animate-fadeIn">
//             <h2 className="text-xl font-bold mb-4">You have logged out!</h2>
//             <p className="text-gray-600">Thank you for visiting. See you soon!</p>
//             <button
//               onClick={() => setShowLogoutDialog(false)}
//               className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;


import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { trackAuthState } from "../utils/auth";
import { Moon, Sun, LogOut, User } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const userDropdownRef = useRef(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = trackAuthState(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setMenuOpen(false);
    setUserDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutDialog(true); // Show logout popover
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = ["Sports", "Brochure", "Contact"];

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl z-50 bg-white dark:bg-gray-900 shadow-lg backdrop-blur-md rounded-full px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="sritrophy_logo" className="w-10 h-10 rounded-full border" />
          <span className="text-[14px] font-bold tracking-wide text-gray-900 dark:text-white md:text-xl">SRI TROPHY</span>
        </Link>

        <nav className="hidden md:flex space-x-20">
          {navItems.map((name) => (
            <Link key={name} to={`/${name.toLowerCase()}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300">
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700 dark:text-gray-300" />}
          </button> */}

          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button onClick={() => setUserDropdown(!userDropdown)} className="w-10 h-10 rounded-full border overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${user.uid}`} alt="User Avatar" className="w-full h-full object-cover" />
              </button>

              {userDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <li>
                    <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-400 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-400 transition">
                      <User className="w-5 h-5 mr-2" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex w-full text-left px-4 py-3 text-gray-400 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-400 transition">
                      <LogOut className="w-5 h-5 mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Login
            </Link>
          )}
        </div>

        <button className="md:hidden flex flex-col items-center" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`h-0.5 w-6 bg-gray-900 dark:bg-white transition ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`h-0.5 w-6 bg-gray-900 dark:bg-white my-1 transition ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`h-0.5 w-6 bg-gray-900 dark:bg-white transition ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>

        {menuOpen && (
          <div className="fixed top-14 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white dark:bg-gray-900 py-6 shadow-lg rounded-lg z-40 transition ease-in-out">
            <ul className="text-center space-y-4">
              {navItems.map((name) => (
                <li key={name}>
                  <Link to={`/${name.toLowerCase()}`} className="text-gray-800 dark:text-gray-300 text-lg font-semibold" onClick={() => setMenuOpen(false)}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      {/* Logout Confirmation Dialog */}
         {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-95 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">You have logged out!</h2>
            <p className="text-gray-600">Thank you for visiting. See you soon!</p>
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
