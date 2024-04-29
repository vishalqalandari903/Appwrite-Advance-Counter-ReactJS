import React from "react";
import ThemeBtn from "./ThemeBtn";
import { useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import { AddThingsBox } from "./AddThingsBox";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className=" md:px-20 w-full min-h-[7vh] flex mb-2 items-center dark:backdrop-blur-lg backdrop-blur-lg bg-background_primary sticky top-0 z-10 p-2 px-5 shadow-lg justify-between">
      <h1 className="dark:text-white text-black text-xl font-medium uppercase">
        Counter App
      </h1>
      <div className="flex items-center gap-2">
        <AddThingsBox />
        {userDetails ? (
          <Logout />
        ) : (
          <div className="flex gap-2">
            <button
              className="text-white bg-primary px-3 py-2 rounded-lg hover:bg-primary_hover"
              onClick={(e) => navigate("/login")}
            >
              Login
            </button>
            <button
              className="text-primary border border-primary py-2 px-3 rounded-lg hover:bg-primary hover:text-white"
              onClick={(e) => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        )}
        <ThemeBtn />
      </div>
    </header>
  );
};
