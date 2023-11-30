import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
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
    <div className="p-5 bg-primary">
      <div className="flex space-x-10 justify-end">
        {menuItems.map((item) => {
          return (
            <Link
              to={`${item.path}`}
              className={`text-gray-200 ${
                item.path === location.pathname &&
                "bg-white text-black rounded py-1 px-3"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
