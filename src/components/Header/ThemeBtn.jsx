import React, { useEffect } from "react";
import { darkMode, lightMode } from "../../app/slices/theme";
import { useDispatch, useSelector } from "react-redux";
import { LuSunMedium } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";

export default function ThemeBtn() {
  const themeMode = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const changeTheme = () => {
    const darkModeStatus = themeMode === "dark";
    if (darkModeStatus) {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <div
        className="dark:hover:bg-slate-800 hover:bg-slate-100 
         text-gray-600 dark:text-slate-200 text-2xl rounded-md border border-button_border p-1 w-10 h-10 flex justify-center items-center"
        onClick={changeTheme}
      >
        {themeMode === "dark" ? (
          <FaRegMoon className="text-xl" />
        ) : (
          <LuSunMedium />
        )}
      </div>
    </label>
  );
}
