import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = [
    {
      title: "Home",
      path: "/",
      id: 1,
    },
    {
      title: "Add Post",
      path: "/addpost",
      id: 2,
    },
    {
      title: "Shares",
      path: "/shares",
      id: 3,
    },
    {
      title: "Profile",
      path: "/profile",
      id: 4,
    },
  ];

  return (
    <div className="p-5 bg-primary rounded rounded-md">
      {!showMenu && (
        <div className="md:flex justify-end hidden bg-primary -mb-8">
          <CgMenuRightAlt
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl font-semibold text-white">DUXGRAM</h1>
          <span className="text-gray-500">
            {/* {user.email.substring(0, user.email.length - 10)} */}
          </span>
        </div>
        {/* Web View */}
        <div className="flex space-x-10 justify-end items-center md:hidden">
          {menuItems.map((item) => {
            return (
              <Link
                to={`${item.path}`}
                className={`text-gray-400 ${
                  item.path == location.pathname &&
                  "bg-white text-black rounded py-1 px-3"
                }`}
                onClick={() => setShowMenu(false)}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        {/* Mobile View */}
        {showMenu && (
          <div className="md:flex space-x-10 justify-end flex-col items-end space-y-5 hidden">
            {menuItems.map((item) => {
              return (
                <Link
                  to={`${item.path}`}
                  className={`text-gray-200 ${
                    item.path == location.pathname &&
                    "bg-white text-black rounded py-1 px-3"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
