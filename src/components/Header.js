import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("duxgram-lite-user"));
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
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
      path: `/profile/${user.id}`,
      id: 4,
    },
  ];

  return (
    <div className="p-3 bg-primary rounded-md">
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
          <span className="text-gray-500">{user.email.split("@")[0]}</span>
        </div>
        {/* web view */}
        <div className="flex space-x-10 justify-end items-center md:hidden">
          {menuItems.map((item) => {
            return (
              <Link
                key={item.id}
                to={`${item.path}`}
                className={`text-gray-200 ${
                  item.path == location.pathname &&
                  "bg-white text-black rounded py-1 px-3"
                }`}
                onClick={() => setShowMenu(false)}
              >
                {item.title}
              </Link>
            );
          })}
          <h1
            className="text-gray-200 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("duxgram-lite-user");
              navigate("/login");
            }}
          >
            Logout
          </h1>
        </div>

        {/* {mobile view} */}
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
            <h1
              className="text-gray-200"
              onClick={() => {
                localStorage.removeItem("duxgram-lite-user");
                navigate("/login");
              }}
            >
              Logout
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
